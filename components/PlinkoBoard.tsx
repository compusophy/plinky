import React, { useEffect, useRef, useState, useMemo } from 'react';
import Matter from 'matter-js';
import { ROWS } from '../constants';

interface PlinkoBoardProps {
  multipliers: number[];
  playTrigger: number;
  onGameEnd: (binIndex: number) => void;
  gravity: number;
}

type BinData = {
    multiplier: number;
    left: number;
    width: number;
    height: number;
    bottom: number;
};

type BoardElements = {
    staticBodies: Matter.Body[];
    pegElements: React.ReactElement[];
    binData: BinData[];
    ballRadius: number;
    ballStartX: number;
    ballStartY: number;
};

const PlinkoBoard: React.FC<PlinkoBoardProps> = ({ multipliers, playTrigger, onGameEnd, gravity }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | undefined>(undefined);
  const runnerRef = useRef<Matter.Runner | undefined>(undefined);
  const lastPlayTrigger = useRef(playTrigger);
  const settledBallRef = useRef<Matter.Body | null>(null);
  const initialBallRef = useRef<Matter.Body | null>(null);
  
  const [balls, setBalls] = useState<Record<string, { x: number; y: number; angle: number }>>({});
  const [winningBin, setWinningBin] = useState<number | null>(null);
  const [boardElements, setBoardElements] = useState<BoardElements | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!sceneRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
        if (sceneRef.current) {
            const { width, height } = sceneRef.current.getBoundingClientRect();
            setDimensions({ width, height });
        }
    });
    resizeObserver.observe(sceneRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return;
    
    const binCount = multipliers.length;
    const pegRows = ROWS;

    const ballRadius = Math.max(3, width * 0.02);
    const pegRadius = Math.max(1.5, width * 0.01);
    
    const hSpacing = width / (binCount);
    
    // Calculate uniform spacing: space above ball = spacing between rows
    // Container has header (vSpacing) + main + footer (vSpacing)
    // Main has: space above ball + ball-to-row0 + (pegRows-1) spacings + space after last peg + space to bins
    // Total spacings in main = 1 (above ball) + 1 (ball to row0) + (pegRows-1) + 1 (after last peg) + 1 (to bins) = pegRows + 3
    const bottomPadding = hSpacing; // Space for bins
    const totalSpacings = pegRows + 3; // Above ball + between rows + after last peg + to bins
    const vSpacing = (height - bottomPadding) / totalSpacings;
    
    // Position ball: space from top to ball center = vSpacing
    const ballStartX = width / 2;
    const ballStartY = vSpacing; // Ball center is vSpacing from top
    
    // First row of pegs starts one spacing below the ball center
    const pegGridStartY = ballStartY + vSpacing;
    
    // Calculate where bins start (completely below last row of pegs)
    // Last row of pegs is at: pegGridStartY + (pegRows - 1) * vSpacing
    // Add full spacing below it to ensure bins are completely under
    const lastPegRowY = pegGridStartY + (pegRows - 1) * vSpacing;
    const pegAreaBottom = lastPegRowY + vSpacing;
    
    const ballStartYAdjusted = ballStartY;

    const staticBodies: Matter.Body[] = [];
    const pegElements: React.ReactElement[] = [];

    for (let row = 0; row < pegRows; row++) {
      const pegsInRow = row + 2;
      const y = pegGridStartY + row * vSpacing;
      const totalRowWidth = (pegsInRow - 1) * hSpacing;
      const startX = (width - totalRowWidth) / 2;

      for (let col = 0; col < pegsInRow; col++) {
        const x = startX + col * hSpacing;
        const peg = Matter.Bodies.circle(x, y, pegRadius, { 
            isStatic: true, label: 'peg', restitution: 0.5, friction: 0.05 
        });
        staticBodies.push(peg);
        pegElements.push(<div key={`p-${row}-${col}`} className="absolute rounded-full shadow-lg" style={{ left: x, top: y, width: pegRadius * 2, height: pegRadius * 2, transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle at 30% 30%, #c1c1c1, #777)' }} />);
      }
    }

    const binDividerTopY = pegAreaBottom;
    const binWallHeight = vSpacing; // Match row height for uniform spacing
    const binBottomY = binDividerTopY + binWallHeight;
    
    const floor = Matter.Bodies.rectangle(width / 2, binBottomY + ballRadius * 2, width * 3, 4, { isStatic: true, label: 'floor' });
    staticBodies.push(floor);

    for (let i = 0; i < binCount + 1; i++) {
        const x = i * hSpacing;
        const pegPart = Matter.Bodies.circle(x, binDividerTopY, pegRadius, { isStatic: true, restitution: 0.5, friction: 0.05 });
        const wallPart = Matter.Bodies.rectangle(x, binDividerTopY + binWallHeight / 2, pegRadius, binWallHeight, { isStatic: true });
        const dividerBody = Matter.Body.create({ parts: [pegPart, wallPart], isStatic: true, label: 'divider' });
        staticBodies.push(dividerBody);
        pegElements.push(<div key={`d-p-${i}`} className="absolute rounded-full shadow-lg" style={{ left: x, top: binDividerTopY, width: pegRadius * 2, height: pegRadius * 2, transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle at 30% 30%, #c1c1c1, #777)' }} />);
    }

    const binData: BinData[] = [];
    for (let i = 0; i < binCount; i++) {
        const sensorX = i * hSpacing + hSpacing / 2;
        const sensorHeight = binWallHeight;
        // Sensor top should align with binDividerTopY (center of divider nodes), so center is at binDividerTopY + sensorHeight/2
        const sensorY = binDividerTopY + sensorHeight / 2;
        const sensor = Matter.Bodies.rectangle(sensorX, sensorY, hSpacing, sensorHeight, { isStatic: true, isSensor: true, label: `bin-${i}` });
        staticBodies.push(sensor);

        const binFloorX = sensorX;
        const binFloorY = binBottomY - (pegRadius / 2);
        const binFloorWidth = hSpacing;
        const binFloorHeight = pegRadius;
        const binFloorBody = Matter.Bodies.rectangle(binFloorX, binFloorY, binFloorWidth, binFloorHeight, { isStatic: true, label: 'bin-floor' });
        staticBodies.push(binFloorBody);

        // Calculate bottom offset: bins should start at binDividerTopY (center of divider nodes) and extend downward
        // The top of the bin should be at binDividerTopY, so bottom = height - binDividerTopY - binWallHeight
        const binBottomOffset = height - binDividerTopY - binWallHeight;
        
        binData.push({
            multiplier: multipliers[i],
            left: (i * 100) / binCount,
            width: 100 / binCount,
            height: binWallHeight,
            bottom: binBottomOffset
        });
    }

    setBoardElements({ staticBodies, pegElements, binData, ballRadius, ballStartX, ballStartY: ballStartYAdjusted });
  }, [dimensions, multipliers]);

  const binElements = useMemo(() => {
      if (!boardElements) return [];
      
      // Rainbow colors mirror-symmetrical: purple at edges, red in middle (semi-transparent)
      const rainbowColors = [
        'bg-purple-500/30',   // Bin 0 - Purple (outer left)
        'bg-indigo-500/30',   // Bin 1 - Indigo
        'bg-blue-500/30',     // Bin 2 - Blue
        'bg-red-500/30',      // Bin 3 - Red (middle left)
        'bg-red-500/30',      // Bin 4 - Red (middle right)
        'bg-blue-500/30',     // Bin 5 - Blue
        'bg-indigo-500/30',   // Bin 6 - Indigo
        'bg-purple-500/30',   // Bin 7 - Purple (outer right)
      ];
      
      return boardElements.binData.map((data: BinData, i: number) => {
        const multiplier = data.multiplier;
        const colorClass = rainbowColors[i] || 'bg-gray-500/30';
        // Extract base color for border and shadow (remove opacity and bg- prefix)
        const baseColor = colorClass.replace('bg-', '').replace('/30', '');
        const borderColorClass = `border-${baseColor}`;
        const shadowColorClass = `shadow-${baseColor}`;
        const isWinning = winningBin === i;
        
        // No background, only add glow when winning
        const glowClass = isWinning ? `shadow-[0_0_15px] ${shadowColorClass}` : '';
        const binClasses = `w-full h-full flex items-center justify-center text-white font-bold text-xs md:text-sm transition-all duration-300 border-l border-r border-b border-t-0 bg-transparent ${borderColorClass} ${glowClass}`;
        
        return (
            <div key={`b-${i}`} className="absolute flex items-center justify-center" style={{ left: `${data.left}%`, width: `${data.width}%`, bottom: `${data.bottom}px`, height: `${data.height}px` }}>
                <div className={binClasses}>
                    {multiplier.toFixed(2)}x
                </div>
            </div>
        )
      })
  }, [boardElements, winningBin, multipliers]);

  useEffect(() => {
    const engine = Matter.Engine.create({ gravity: { y: gravity } });
    const runner = Matter.Runner.create();
    engineRef.current = engine;
    runnerRef.current = runner;
    
    if (!boardElements) return;

    Matter.Composite.add(engine.world, boardElements.staticBodies);
    
    // Create initial static ball at starting position
    const { ballStartX, ballStartY, ballRadius } = boardElements;
    const initialBall = Matter.Bodies.circle(ballStartX, ballStartY, ballRadius, {
      label: 'ball',
      isStatic: true,
    });
    Matter.Composite.add(engine.world, initialBall);
    initialBallRef.current = initialBall;
    
    Matter.Runner.run(runner, engine);

    let animationFrameId: number;
    const update = () => {
        if (!engineRef.current) return;
        const updatedBalls: Record<string, { x: number; y: number; angle: number }> = {};
        Matter.Composite.allBodies(engineRef.current.world).forEach((body: Matter.Body) => {
            if (body.label === 'ball') {
                updatedBalls[body.id] = { x: body.position.x, y: body.position.y, angle: body.angle };
            }
        });
        setBalls(updatedBalls);
        animationFrameId = requestAnimationFrame(update);
    };
    update();
    
    const collisionHandler = (event: Matter.IEventCollision<Matter.Engine>) => {
        for (const pair of event.pairs) {
            const { bodyA, bodyB } = pair;
            const ball = bodyA.label === 'ball' ? bodyA : (bodyB.label === 'ball' ? bodyB : null);
            if (!ball || (ball as any).isSettled) continue;

            const binSensor = bodyA.label.startsWith('bin-') ? bodyA : (bodyB.label.startsWith('bin-') ? bodyB : null);
            const floor = bodyA.label === 'floor' ? bodyA : (bodyB.label === 'floor' ? bodyB : null);

            const handleSettled = (binIndex: number) => {
                if ((ball as any).isSettled) return;
                (ball as any).isSettled = true;
                settledBallRef.current = ball;

                onGameEnd(binIndex);
                if (binIndex !== -1) {
                    setWinningBin(binIndex);
                }
            };

            if (binSensor) {
                handleSettled(parseInt(binSensor.label.split('-')[1]));
            } else if (floor) {
                handleSettled(-1);
            }
        }
    };

    Matter.Events.on(engine, 'collisionStart', collisionHandler);

    return () => {
        cancelAnimationFrame(animationFrameId);
        Matter.Events.off(engine, 'collisionStart', collisionHandler);
        if(runner) Matter.Runner.stop(runner);
        if(engine) Matter.Engine.clear(engine);
    };
  }, [boardElements, onGameEnd]);

  // Update gravity dynamically
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.world.gravity.y = gravity;
    }
  }, [gravity]);

  useEffect(() => {
    if (playTrigger > lastPlayTrigger.current) {
        lastPlayTrigger.current = playTrigger;

        if (settledBallRef.current && engineRef.current) {
            Matter.World.remove(engineRef.current.world, settledBallRef.current);
            settledBallRef.current = null;
        }
        
        // Remove initial static ball if it exists
        if (initialBallRef.current && engineRef.current) {
            Matter.World.remove(engineRef.current.world, initialBallRef.current);
            initialBallRef.current = null;
        }
        
        setWinningBin(null);

        if (engineRef.current && boardElements) {
            const { ballStartX, ballStartY, ballRadius } = boardElements;
            const randomOffset = (Math.random() - 0.5) * ballRadius * 0.1;
            const x = ballStartX + randomOffset;
            const ball = Matter.Bodies.circle(x, ballStartY, ballRadius, {
                label: 'ball', restitution: 0.6, friction: 0.01, slop: 0.1, density: 0.01,
            });
            Matter.Composite.add(engineRef.current.world, ball);
        }
    }
  }, [playTrigger, boardElements]);

  return (
    <div ref={sceneRef} className="relative w-full h-full overflow-hidden">
      {boardElements?.pegElements}
      {binElements}
      {Object.keys(balls).map((id) => {
        const pos = balls[id];
        return (
          <div key={id} className="absolute rounded-full" style={{
              background: 'radial-gradient(circle at 30% 30%, #3e9c35, #168118, #157811)',
              boxShadow: '0 0 5px #168118, 0 0 10px #168118',
              width: boardElements ? boardElements.ballRadius * 2 : 0,
              height: boardElements ? boardElements.ballRadius * 2 : 0,
              left: pos.x,
              top: pos.y,
              transform: `translate(-50%, -50%) rotate(${pos.angle}rad)`,
          }} />
        );
      })}
    </div>
  );
};

export default PlinkoBoard;