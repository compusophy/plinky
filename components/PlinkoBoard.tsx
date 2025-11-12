import React, { useEffect, useRef, useState, useMemo } from 'react';
import Matter from 'matter-js';
import { ROWS, getMultiplierColor } from '../constants';

interface PlinkoBoardProps {
  multipliers: number[];
  playTrigger: number;
  onGameEnd: (binIndex: number) => void;
}

type BinData = {
    multiplier: number;
    left: number;
    width: number;
    height: number;
};

type BoardElements = {
    staticBodies: Matter.Body[];
    pegElements: React.ReactElement[];
    binData: BinData[];
    ballRadius: number;
    ballStartX: number;
    ballStartY: number;
};

const PlinkoBoard: React.FC<PlinkoBoardProps> = ({ multipliers, playTrigger, onGameEnd }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>();
  const runnerRef = useRef<Matter.Runner>();
  const lastPlayTrigger = useRef(playTrigger);
  const settledBallRef = useRef<Matter.Body | null>(null);
  
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
    
    const ballStartX = width / 2;
    const ballStartY = ballRadius * 2;
    
    const hSpacing = width / (binCount);
    const pegGridStartY = ballStartY + ballRadius * 3;
    const pegAreaBottom = height - hSpacing;
    const pegAreaHeight = pegAreaBottom - pegGridStartY;
    const vSpacing = pegAreaHeight / pegRows;

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
    const binWallHeight = hSpacing;
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
        const sensorY = binDividerTopY + sensorHeight / 2;
        const sensor = Matter.Bodies.rectangle(sensorX, sensorY, hSpacing, sensorHeight, { isStatic: true, isSensor: true, label: `bin-${i}` });
        staticBodies.push(sensor);

        const binFloorX = sensorX;
        const binFloorY = binBottomY - (pegRadius / 2);
        const binFloorWidth = hSpacing;
        const binFloorHeight = pegRadius;
        const binFloorBody = Matter.Bodies.rectangle(binFloorX, binFloorY, binFloorWidth, binFloorHeight, { isStatic: true, label: 'bin-floor' });
        staticBodies.push(binFloorBody);

        binData.push({
            multiplier: multipliers[i],
            left: (i * 100) / binCount,
            width: 100 / binCount,
            height: binWallHeight
        });
    }

    setBoardElements({ staticBodies, pegElements, binData, ballRadius, ballStartX, ballStartY });
  }, [dimensions, multipliers]);

  const binElements = useMemo(() => {
      if (!boardElements) return [];
      return boardElements.binData.map((data, i) => {
        const multiplier = data.multiplier;
        const colorClass = getMultiplierColor(multiplier);
        const borderColorClass = colorClass.replace('bg-', 'border-');
        const shadowColorClass = colorClass.replace('bg-', 'shadow-');
        const isWinning = winningBin === i;
        
        const highlightClass = isWinning ? `${colorClass.replace('500', '500/20')} shadow-[0_0_15px] ${shadowColorClass}` : 'bg-transparent';
        const binClasses = `w-full h-full rounded-b-md flex items-center justify-center text-white font-bold text-xs md:text-sm transition-all duration-300 border-2 ${borderColorClass} ${highlightClass}`;
        
        return (
            <div key={`b-${i}`} className="absolute bottom-0 flex items-center justify-center" style={{ left: `${data.left}%`, width: `${data.width}%`, height: data.height }}>
                <div className={binClasses}>
                    {multiplier.toFixed(2)}x
                </div>
            </div>
        )
      })
  }, [boardElements, winningBin, multipliers]);

  useEffect(() => {
    const engine = Matter.Engine.create({ gravity: { y: 0.25 } });
    const runner = Matter.Runner.create();
    engineRef.current = engine;
    runnerRef.current = runner;
    
    if (!boardElements) return;

    Matter.Composite.add(engine.world, boardElements.staticBodies);
    Matter.Runner.run(runner, engine);

    let animationFrameId: number;
    const update = () => {
        if (!engineRef.current) return;
        const updatedBalls: Record<string, { x: number; y: number; angle: number }> = {};
        Matter.Composite.allBodies(engineRef.current.world).forEach(body => {
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

  useEffect(() => {
    if (playTrigger > lastPlayTrigger.current) {
        lastPlayTrigger.current = playTrigger;

        if (settledBallRef.current && engineRef.current) {
            Matter.World.remove(engineRef.current.world, settledBallRef.current);
            settledBallRef.current = null;
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
              background: 'radial-gradient(circle at 30% 30%, #d1faf0, #14b8a6, #0f766e)',
              boxShadow: '0 0 5px #14b8a6, 0 0 10px #14b8a6',
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