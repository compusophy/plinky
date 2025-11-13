(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MULTIPLIERS",
    ()=>MULTIPLIERS,
    "MULTIPLIER_COLORS",
    ()=>MULTIPLIER_COLORS,
    "ROWS",
    ()=>ROWS,
    "getMultiplierColor",
    ()=>getMultiplierColor
]);
const ROWS = 7;
const MULTIPLIERS = [
    3.7,
    2.1,
    1.05,
    0.58,
    0.58,
    1.05,
    2.1,
    3.7
];
const MULTIPLIER_COLORS = {
    0.9: 'bg-purple-500',
    1.0: 'bg-blue-500',
    1.5: 'bg-cyan-500',
    2.0: 'bg-teal-500',
    4.0: 'bg-green-500',
    7.0: 'bg-yellow-500',
    15.0: 'bg-orange-500',
    50.0: 'bg-red-500',
    100.0: 'bg-pink-500'
};
const getMultiplierColor = (multiplier)=>{
    const keys = Object.keys(MULTIPLIER_COLORS).map(Number).sort((a, b)=>a - b);
    for (const key of keys){
        if (multiplier <= key) {
            return MULTIPLIER_COLORS[key];
        }
    }
    return MULTIPLIER_COLORS[keys[keys.length - 1]];
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/PlinkoBoard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/matter-js@0.19.0/node_modules/matter-js/build/matter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const PlinkoBoard = ({ multipliers, playTrigger, onGameEnd, gravity })=>{
    _s();
    const sceneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const engineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const runnerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const lastPlayTrigger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(playTrigger);
    const settledBallRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const initialBallRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [balls, setBalls] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [winningBin, setWinningBin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [boardElements, setBoardElements] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dimensions, setDimensions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        width: 0,
        height: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlinkoBoard.useEffect": ()=>{
            if (!sceneRef.current) return;
            const resizeObserver = new ResizeObserver({
                "PlinkoBoard.useEffect": ()=>{
                    if (sceneRef.current) {
                        const { width, height } = sceneRef.current.getBoundingClientRect();
                        setDimensions({
                            width,
                            height
                        });
                    }
                }
            }["PlinkoBoard.useEffect"]);
            resizeObserver.observe(sceneRef.current);
            return ({
                "PlinkoBoard.useEffect": ()=>resizeObserver.disconnect()
            })["PlinkoBoard.useEffect"];
        }
    }["PlinkoBoard.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlinkoBoard.useEffect": ()=>{
            const { width, height } = dimensions;
            if (width === 0 || height === 0) return;
            const binCount = multipliers.length;
            const pegRows = __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"];
            const ballRadius = Math.max(3, width * 0.02);
            const pegRadius = Math.max(1.5, width * 0.01);
            const hSpacing = width / binCount;
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
            const staticBodies = [];
            const pegElements = [];
            for(let row = 0; row < pegRows; row++){
                const pegsInRow = row + 2;
                const y = pegGridStartY + row * vSpacing;
                const totalRowWidth = (pegsInRow - 1) * hSpacing;
                const startX = (width - totalRowWidth) / 2;
                for(let col = 0; col < pegsInRow; col++){
                    const x = startX + col * hSpacing;
                    const peg = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Bodies.circle(x, y, pegRadius, {
                        isStatic: true,
                        label: 'peg',
                        restitution: 0.5,
                        friction: 0.05
                    });
                    staticBodies.push(peg);
                    pegElements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute rounded-full shadow-lg",
                        style: {
                            left: x,
                            top: y,
                            width: pegRadius * 2,
                            height: pegRadius * 2,
                            transform: 'translate(-50%, -50%)',
                            background: 'radial-gradient(circle at 30% 30%, #c1c1c1, #777)'
                        }
                    }, `p-${row}-${col}`, false, {
                        fileName: "[project]/components/PlinkoBoard.tsx",
                        lineNumber: 104,
                        columnNumber: 26
                    }, ("TURBOPACK compile-time value", void 0)));
                }
            }
            const binDividerTopY = pegAreaBottom;
            const binWallHeight = vSpacing; // Match row height for uniform spacing
            const binBottomY = binDividerTopY + binWallHeight;
            const floor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Bodies.rectangle(width / 2, binBottomY + ballRadius * 2, width * 3, 4, {
                isStatic: true,
                label: 'floor'
            });
            staticBodies.push(floor);
            for(let i = 0; i < binCount + 1; i++){
                const x = i * hSpacing;
                const pegPart = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Bodies.circle(x, binDividerTopY, pegRadius, {
                    isStatic: true,
                    restitution: 0.5,
                    friction: 0.05
                });
                const wallPart = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Bodies.rectangle(x, binDividerTopY + binWallHeight / 2, pegRadius, binWallHeight, {
                    isStatic: true
                });
                const dividerBody = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Body.create({
                    parts: [
                        pegPart,
                        wallPart
                    ],
                    isStatic: true,
                    label: 'divider'
                });
                staticBodies.push(dividerBody);
                pegElements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute rounded-full shadow-lg",
                    style: {
                        left: x,
                        top: binDividerTopY,
                        width: pegRadius * 2,
                        height: pegRadius * 2,
                        transform: 'translate(-50%, -50%)',
                        background: 'radial-gradient(circle at 30% 30%, #c1c1c1, #777)'
                    }
                }, `d-p-${i}`, false, {
                    fileName: "[project]/components/PlinkoBoard.tsx",
                    lineNumber: 121,
                    columnNumber: 26
                }, ("TURBOPACK compile-time value", void 0)));
            }
            const binData = [];
            for(let i = 0; i < binCount; i++){
                const sensorX = i * hSpacing + hSpacing / 2;
                const sensorHeight = binWallHeight;
                // Sensor top should align with binDividerTopY (center of divider nodes), so center is at binDividerTopY + sensorHeight/2
                const sensorY = binDividerTopY + sensorHeight / 2;
                const sensor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Bodies.rectangle(sensorX, sensorY, hSpacing, sensorHeight, {
                    isStatic: true,
                    isSensor: true,
                    label: `bin-${i}`
                });
                staticBodies.push(sensor);
                const binFloorX = sensorX;
                const binFloorY = binBottomY - pegRadius / 2;
                const binFloorWidth = hSpacing;
                const binFloorHeight = pegRadius;
                const binFloorBody = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Bodies.rectangle(binFloorX, binFloorY, binFloorWidth, binFloorHeight, {
                    isStatic: true,
                    label: 'bin-floor'
                });
                staticBodies.push(binFloorBody);
                // Calculate bottom offset: bins should start at binDividerTopY (center of divider nodes) and extend downward
                // The top of the bin should be at binDividerTopY, so bottom = height - binDividerTopY - binWallHeight
                const binBottomOffset = height - binDividerTopY - binWallHeight;
                binData.push({
                    multiplier: multipliers[i],
                    left: i * 100 / binCount,
                    width: 100 / binCount,
                    height: binWallHeight,
                    bottom: binBottomOffset
                });
            }
            setBoardElements({
                staticBodies,
                pegElements,
                binData,
                ballRadius,
                ballStartX,
                ballStartY: ballStartYAdjusted
            });
        }
    }["PlinkoBoard.useEffect"], [
        dimensions,
        multipliers
    ]);
    const binElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlinkoBoard.useMemo[binElements]": ()=>{
            if (!boardElements) return [];
            // Rainbow colors mirror-symmetrical: purple at edges, red in middle (semi-transparent)
            const rainbowColors = [
                'bg-purple-500/30',
                'bg-indigo-500/30',
                'bg-blue-500/30',
                'bg-red-500/30',
                'bg-red-500/30',
                'bg-blue-500/30',
                'bg-indigo-500/30',
                'bg-purple-500/30'
            ];
            return boardElements.binData.map({
                "PlinkoBoard.useMemo[binElements]": (data, i)=>{
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
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute flex items-center justify-center",
                        style: {
                            left: `${data.left}%`,
                            width: `${data.width}%`,
                            bottom: `${data.bottom}px`,
                            height: `${data.height}px`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: binClasses,
                            children: [
                                multiplier.toFixed(2),
                                "x"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/PlinkoBoard.tsx",
                            lineNumber: 186,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    }, `b-${i}`, false, {
                        fileName: "[project]/components/PlinkoBoard.tsx",
                        lineNumber: 185,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                }
            }["PlinkoBoard.useMemo[binElements]"]);
        }
    }["PlinkoBoard.useMemo[binElements]"], [
        boardElements,
        winningBin,
        multipliers
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlinkoBoard.useEffect": ()=>{
            const engine = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Engine.create({
                gravity: {
                    y: gravity
                }
            });
            const runner = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Runner.create();
            engineRef.current = engine;
            runnerRef.current = runner;
            if (!boardElements) return;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Composite.add(engine.world, boardElements.staticBodies);
            // Create initial static ball at starting position
            const { ballStartX, ballStartY, ballRadius } = boardElements;
            const initialBall = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Bodies.circle(ballStartX, ballStartY, ballRadius, {
                label: 'ball',
                isStatic: true
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Composite.add(engine.world, initialBall);
            initialBallRef.current = initialBall;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Runner.run(runner, engine);
            let animationFrameId;
            const update = {
                "PlinkoBoard.useEffect.update": ()=>{
                    if (!engineRef.current) return;
                    const updatedBalls = {};
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Composite.allBodies(engineRef.current.world).forEach({
                        "PlinkoBoard.useEffect.update": (body)=>{
                            if (body.label === 'ball') {
                                updatedBalls[body.id] = {
                                    x: body.position.x,
                                    y: body.position.y,
                                    angle: body.angle
                                };
                            }
                        }
                    }["PlinkoBoard.useEffect.update"]);
                    setBalls(updatedBalls);
                    animationFrameId = requestAnimationFrame(update);
                }
            }["PlinkoBoard.useEffect.update"];
            update();
            const collisionHandler = {
                "PlinkoBoard.useEffect.collisionHandler": (event)=>{
                    for (const pair of event.pairs){
                        const { bodyA, bodyB } = pair;
                        const ball = bodyA.label === 'ball' ? bodyA : bodyB.label === 'ball' ? bodyB : null;
                        if (!ball || ball.isSettled) continue;
                        const binSensor = bodyA.label.startsWith('bin-') ? bodyA : bodyB.label.startsWith('bin-') ? bodyB : null;
                        const floor = bodyA.label === 'floor' ? bodyA : bodyB.label === 'floor' ? bodyB : null;
                        const handleSettled = {
                            "PlinkoBoard.useEffect.collisionHandler.handleSettled": (binIndex)=>{
                                if (ball.isSettled) return;
                                ball.isSettled = true;
                                settledBallRef.current = ball;
                                onGameEnd(binIndex);
                                if (binIndex !== -1) {
                                    setWinningBin(binIndex);
                                }
                            }
                        }["PlinkoBoard.useEffect.collisionHandler.handleSettled"];
                        if (binSensor) {
                            handleSettled(parseInt(binSensor.label.split('-')[1]));
                        } else if (floor) {
                            handleSettled(-1);
                        }
                    }
                }
            }["PlinkoBoard.useEffect.collisionHandler"];
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Events.on(engine, 'collisionStart', collisionHandler);
            return ({
                "PlinkoBoard.useEffect": ()=>{
                    cancelAnimationFrame(animationFrameId);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Events.off(engine, 'collisionStart', collisionHandler);
                    if (runner) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Runner.stop(runner);
                    if (engine) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Engine.clear(engine);
                }
            })["PlinkoBoard.useEffect"];
        }
    }["PlinkoBoard.useEffect"], [
        boardElements,
        onGameEnd
    ]);
    // Update gravity dynamically
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlinkoBoard.useEffect": ()=>{
            if (engineRef.current) {
                engineRef.current.world.gravity.y = gravity;
            }
        }
    }["PlinkoBoard.useEffect"], [
        gravity
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlinkoBoard.useEffect": ()=>{
            if (playTrigger > lastPlayTrigger.current) {
                lastPlayTrigger.current = playTrigger;
                if (settledBallRef.current && engineRef.current) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].World.remove(engineRef.current.world, settledBallRef.current);
                    settledBallRef.current = null;
                }
                // Remove initial static ball if it exists
                if (initialBallRef.current && engineRef.current) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].World.remove(engineRef.current.world, initialBallRef.current);
                    initialBallRef.current = null;
                }
                setWinningBin(null);
                if (engineRef.current && boardElements) {
                    const { ballStartX, ballStartY, ballRadius } = boardElements;
                    const randomOffset = (Math.random() - 0.5) * ballRadius * 0.1;
                    const x = ballStartX + randomOffset;
                    const ball = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Bodies.circle(x, ballStartY, ballRadius, {
                        label: 'ball',
                        restitution: 0.6,
                        friction: 0.01,
                        slop: 0.1,
                        density: 0.01
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Composite.add(engineRef.current.world, ball);
                }
            }
        }
    }["PlinkoBoard.useEffect"], [
        playTrigger,
        boardElements
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: sceneRef,
        className: "relative w-full h-full overflow-hidden",
        children: [
            boardElements?.pegElements,
            binElements,
            Object.keys(balls).map((id)=>{
                const pos = balls[id];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute rounded-full",
                    style: {
                        background: 'radial-gradient(circle at 30% 30%, #3e9c35, #168118, #157811)',
                        boxShadow: '0 0 5px #168118, 0 0 10px #168118',
                        width: boardElements ? boardElements.ballRadius * 2 : 0,
                        height: boardElements ? boardElements.ballRadius * 2 : 0,
                        left: pos.x,
                        top: pos.y,
                        transform: `translate(-50%, -50%) rotate(${pos.angle}rad)`
                    }
                }, id, false, {
                    fileName: "[project]/components/PlinkoBoard.tsx",
                    lineNumber: 310,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            })
        ]
    }, void 0, true, {
        fileName: "[project]/components/PlinkoBoard.tsx",
        lineNumber: 304,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PlinkoBoard, "HNZLXNf/iGumVOJRjZ2E/Ogo5y0=");
_c = PlinkoBoard;
const __TURBOPACK__default__export__ = PlinkoBoard;
var _c;
__turbopack_context__.k.register(_c, "PlinkoBoard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/HistoryTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const HistoryTable = ({ history })=>{
    _s();
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HistoryTable.useMemo[stats]": ()=>{
            if (history.length === 0) {
                return {
                    totalGames: 0,
                    totalPayout: 0,
                    totalBets: 0,
                    actualEV: 0,
                    actualRTP: 0,
                    totalProfit: 0
                };
            }
            const totalGames = history.length;
            const totalPayout = history.reduce({
                "HistoryTable.useMemo[stats].totalPayout": (sum, result)=>sum + result.payout
            }["HistoryTable.useMemo[stats].totalPayout"], 0);
            const totalBets = totalGames; // Each game costs 1
            const totalProfit = history.reduce({
                "HistoryTable.useMemo[stats].totalProfit": (sum, result)=>sum + result.profit
            }["HistoryTable.useMemo[stats].totalProfit"], 0);
            const actualEV = totalPayout / totalGames; // Average payout per game
            const actualRTP = totalPayout / totalBets; // Return to player percentage
            return {
                totalGames,
                totalPayout,
                totalBets,
                actualEV,
                actualRTP,
                totalProfit
            };
        }
    }["HistoryTable.useMemo[stats]"], [
        history
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 space-y-4",
        children: [
            history.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-900/70 p-3 rounded-md space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-semibold text-base text-white mb-3",
                        children: "Actual Statistics"
                    }, void 0, false, {
                        fileName: "[project]/components/HistoryTable.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-gray-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Total Games:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-white",
                                        children: stats.totalGames
                                    }, void 0, false, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/HistoryTable.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-gray-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Total Bets:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-white",
                                        children: [
                                            "$",
                                            stats.totalBets.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/HistoryTable.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-gray-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Total Payout:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-white",
                                        children: [
                                            "$",
                                            stats.totalPayout.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 54,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/HistoryTable.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-gray-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Total Profit:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 57,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono font-semibold",
                                        style: {
                                            color: stats.totalProfit >= 0 ? '#3e9c35' : '#ef4444'
                                        },
                                        children: [
                                            stats.totalProfit >= 0 ? '+' : '',
                                            "$",
                                            stats.totalProfit.toFixed(2)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/HistoryTable.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-gray-700 pt-2 mt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-gray-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Actual EV (Avg Payout):"
                                            }, void 0, false, {
                                                fileName: "[project]/components/HistoryTable.tsx",
                                                lineNumber: 64,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono",
                                                style: {
                                                    color: '#3e9c35'
                                                },
                                                children: stats.actualEV.toFixed(4)
                                            }, void 0, false, {
                                                fileName: "[project]/components/HistoryTable.tsx",
                                                lineNumber: 65,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 63,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-gray-300 mt-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Actual RTP:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/HistoryTable.tsx",
                                                lineNumber: 68,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono",
                                                style: {
                                                    color: '#3e9c35'
                                                },
                                                children: [
                                                    (stats.actualRTP * 100).toFixed(2),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/HistoryTable.tsx",
                                                lineNumber: 69,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 67,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/HistoryTable.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/HistoryTable.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/HistoryTable.tsx",
                lineNumber: 41,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-y-auto max-h-[60vh]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-sm text-left text-gray-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "text-xs text-gray-400 uppercase bg-gray-700/50 sticky top-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        scope: "col",
                                        className: "px-4 py-2 font-mono",
                                        children: "Multiplier"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 79,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        scope: "col",
                                        className: "px-4 py-2 font-mono",
                                        children: "Payout"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 80,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        scope: "col",
                                        className: "px-4 py-2 font-mono text-right",
                                        children: "Profit"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 81,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/HistoryTable.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/HistoryTable.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: [
                                history.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: 3,
                                        className: "text-center py-8 text-gray-500",
                                        children: "No games played yet."
                                    }, void 0, false, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 87,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/HistoryTable.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                history.map((result)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-gray-700 hover:bg-gray-700/50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-2 font-mono",
                                                children: [
                                                    result.multiplier.toFixed(2),
                                                    "x"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/HistoryTable.tsx",
                                                lineNumber: 92,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-2 font-mono",
                                                children: [
                                                    "$",
                                                    result.payout.toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/HistoryTable.tsx",
                                                lineNumber: 93,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-2 font-mono text-right font-semibold",
                                                style: {
                                                    color: result.profit >= 0 ? '#3e9c35' : '#ef4444'
                                                },
                                                children: [
                                                    result.profit >= 0 ? '+' : '',
                                                    "$",
                                                    result.profit.toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/HistoryTable.tsx",
                                                lineNumber: 94,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, result.id, true, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/HistoryTable.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/HistoryTable.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/HistoryTable.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/HistoryTable.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(HistoryTable, "3FvJDKtC3yF1gbNv5/WixcrN7Rs=");
_c = HistoryTable;
const __TURBOPACK__default__export__ = HistoryTable;
var _c;
__turbopack_context__.k.register(_c, "HistoryTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/App.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PlinkoBoard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PlinkoBoard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HistoryTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/HistoryTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const App = ()=>{
    _s();
    const [balance, setBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1000);
    const [multipliers, setMultipliers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MULTIPLIERS"]);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [playTrigger, setPlayTrigger] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isBallInPlay, setIsBallInPlay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDevToolsVisible, setIsDevToolsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [devToolsTab, setDevToolsTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('devtools');
    const [lastPayout, setLastPayout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [simulationResult, setSimulationResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [targetRTP, setTargetRTP] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0.95);
    const [isCalculating, setIsCalculating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const mainRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [rowSpacing, setRowSpacing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [containerHeight, setContainerHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Gravity calibration state
    const [gravity, setGravity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0.1);
    const binDistributionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const calibrationHistoryRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const BET_AMOUNT = 1;
    // Calculate binomial coefficient (n choose k)
    const binomialCoefficient = (n, k)=>{
        if (k > n - k) k = n - k;
        let result = 1;
        for(let i = 0; i < k; i++){
            result = result * (n - i) / (i + 1);
        }
        return result;
    };
    // Calculate exact probabilities for each bin using binomial distribution
    const calculateBinProbabilities = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "App.useCallback[calculateBinProbabilities]": (binCount)=>{
            const probabilities = new Array(binCount).fill(0);
            const totalPaths = Math.pow(2, __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"]);
            // Starting position is center: (binCount - 1) / 2
            const centerPos = (binCount - 1) / 2;
            // For each possible number of right moves (0 to ROWS)
            for(let rightMoves = 0; rightMoves <= __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"]; rightMoves++){
                const leftMoves = __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"] - rightMoves;
                // Calculate final position: center + (rightMoves - leftMoves) * 0.5
                // Each move shifts by 0.5 positions
                const finalPosition = centerPos + (rightMoves - leftMoves) * 0.5;
                // Round to nearest bin (bins are at integer positions 0, 1, 2, ..., binCount-1)
                const targetBin = Math.round(finalPosition);
                // Clamp to valid bin range
                if (targetBin >= 0 && targetBin < binCount) {
                    const ways = binomialCoefficient(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"], rightMoves);
                    probabilities[targetBin] += ways / totalPaths;
                }
            }
            return probabilities;
        }
    }["App.useCallback[calculateBinProbabilities]"], []);
    // Calculate expected value deterministically
    const calculateExpectedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "App.useCallback[calculateExpectedValue]": (multipliers)=>{
            const probabilities = calculateBinProbabilities(multipliers.length);
            let ev = 0;
            for(let i = 0; i < multipliers.length; i++){
                ev += probabilities[i] * multipliers[i];
            }
            return ev;
        }
    }["App.useCallback[calculateExpectedValue]"], [
        calculateBinProbabilities
    ]);
    // Initialize bin distribution tracking
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            binDistributionRef.current = new Array(multipliers.length).fill(0);
        }
    }["App.useEffect"], [
        multipliers.length
    ]);
    // Calculate perfect container height based on width for even row divisions
    // Container = header (vSpacing) + main + footer (vSpacing)
    // Main = space above ball (vSpacing) + ball-to-row0 (vSpacing) + between rows (ROWS-1)*vSpacing + space after last peg (vSpacing) + to bins (vSpacing) = (ROWS+3)*vSpacing
    // So: containerHeight = 2*vSpacing + (ROWS+3)*vSpacing + bottomPadding = (ROWS+5)*vSpacing + bottomPadding
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            const updateContainer = {
                "App.useEffect.updateContainer": ()=>{
                    if (!containerRef.current) return;
                    const width = containerRef.current.clientWidth || window.innerWidth;
                    const binCount = multipliers.length;
                    const hSpacing = width / binCount;
                    const bottomPadding = hSpacing;
                    const screenHeight = window.innerHeight;
                    const totalSpacings = __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"] + 5; // header + above ball + between rows + after last peg + to bins + footer
                    // Calculate vSpacing that fits screen
                    const estimatedVSpacing = (screenHeight - bottomPadding) / totalSpacings;
                    // Calculate perfect container height (must be exactly divisible)
                    const perfectHeight = estimatedVSpacing * totalSpacings + bottomPadding;
                    // Constrain to screen but keep perfect division
                    const finalHeight = Math.min(perfectHeight, screenHeight);
                    const finalVSpacing = (finalHeight - bottomPadding) / totalSpacings;
                    setContainerHeight(finalHeight);
                    setRowSpacing(finalVSpacing);
                }
            }["App.useEffect.updateContainer"];
            // Wait for container to be rendered
            const timeoutId = setTimeout(updateContainer, 0);
            window.addEventListener('resize', updateContainer);
            return ({
                "App.useEffect": ()=>{
                    clearTimeout(timeoutId);
                    window.removeEventListener('resize', updateContainer);
                }
            })["App.useEffect"];
        }
    }["App.useEffect"], [
        multipliers
    ]);
    const handlePlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "App.useCallback[handlePlay]": ()=>{
            if (balance < BET_AMOUNT || isBallInPlay) {
                return;
            }
            setIsBallInPlay(true);
            setLastPayout(null); // Clear payout display when starting new play
            setBalance({
                "App.useCallback[handlePlay]": (prev)=>prev - BET_AMOUNT
            }["App.useCallback[handlePlay]"]);
            setPlayTrigger({
                "App.useCallback[handlePlay]": (prev)=>prev + 1
            }["App.useCallback[handlePlay]"]);
        }
    }["App.useCallback[handlePlay]"], [
        balance,
        isBallInPlay
    ]);
    // Calculate expected distribution (binomial)
    const getExpectedDistribution = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "App.useCallback[getExpectedDistribution]": ()=>{
            return calculateBinProbabilities(multipliers.length);
        }
    }["App.useCallback[getExpectedDistribution]"], [
        multipliers.length,
        calculateBinProbabilities
    ]);
    // PID-like gravity calibration
    const calibrateGravity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "App.useCallback[calibrateGravity]": ()=>{
            const totalGames = binDistributionRef.current.reduce({
                "App.useCallback[calibrateGravity].totalGames": (a, b)=>a + b
            }["App.useCallback[calibrateGravity].totalGames"], 0);
            if (totalGames < 20) return; // Need at least 20 games for calibration
            const expectedDist = getExpectedDistribution();
            const actualDist = binDistributionRef.current.map({
                "App.useCallback[calibrateGravity].actualDist": (count)=>count / totalGames
            }["App.useCallback[calibrateGravity].actualDist"]);
            // Calculate error: how much the distribution is skewed toward center
            // If balls cluster in center, gravity is too low
            const centerBins = [
                3,
                4
            ]; // Indices of center bins (0.58x)
            const edgeBins = [
                0,
                1,
                6,
                7
            ]; // Indices of edge bins
            let centerError = 0;
            let edgeError = 0;
            centerBins.forEach({
                "App.useCallback[calibrateGravity]": (i)=>{
                    centerError += actualDist[i] - expectedDist[i];
                }
            }["App.useCallback[calibrateGravity]"]);
            edgeBins.forEach({
                "App.useCallback[calibrateGravity]": (i)=>{
                    edgeError += expectedDist[i] - actualDist[i];
                }
            }["App.useCallback[calibrateGravity]"]);
            // If too many balls in center, increase gravity
            // If too many balls at edges, decrease gravity
            const error = centerError - edgeError;
            // PID controller parameters
            const Kp = 0.5; // Proportional gain
            const Ki = 0.1; // Integral gain
            const Kd = 0.05; // Derivative gain
            // Store error history for integral and derivative terms
            calibrationHistoryRef.current.push(error);
            if (calibrationHistoryRef.current.length > 10) {
                calibrationHistoryRef.current.shift();
            }
            const integral = calibrationHistoryRef.current.reduce({
                "App.useCallback[calibrateGravity].integral": (a, b)=>a + b
            }["App.useCallback[calibrateGravity].integral"], 0);
            const derivative = calibrationHistoryRef.current.length > 1 ? error - calibrationHistoryRef.current[calibrationHistoryRef.current.length - 2] : 0;
            const adjustment = Kp * error + Ki * integral + Kd * derivative;
            // Update gravity (clamp between 0.01 and 0.5)
            const newGravity = Math.max(0.01, Math.min(0.5, gravity + adjustment * 0.01));
            setGravity(newGravity);
            // Reset distribution every 50 games for continuous calibration
            if (totalGames >= 50) {
                binDistributionRef.current = new Array(multipliers.length).fill(0);
            }
        }
    }["App.useCallback[calibrateGravity]"], [
        gravity,
        multipliers.length,
        getExpectedDistribution
    ]);
    const handleGameEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "App.useCallback[handleGameEnd]": (finalBinIndex)=>{
            const isLoss = finalBinIndex === -1;
            const multiplier = isLoss ? 0 : multipliers[finalBinIndex];
            const payout = BET_AMOUNT * multiplier;
            const profit = payout - BET_AMOUNT;
            // Track distribution for gravity calibration
            if (!isLoss && finalBinIndex >= 0 && finalBinIndex < multipliers.length) {
                binDistributionRef.current[finalBinIndex]++;
                calibrateGravity();
            }
            setBalance({
                "App.useCallback[handleGameEnd]": (prev)=>prev + payout
            }["App.useCallback[handleGameEnd]"]);
            const newResult = {
                id: Date.now() + Math.random(),
                multiplier,
                payout,
                profit
            };
            setHistory({
                "App.useCallback[handleGameEnd]": (prev)=>[
                        newResult,
                        ...prev.slice(0, 14)
                    ]
            }["App.useCallback[handleGameEnd]"]);
            setLastPayout({
                payout,
                key: Date.now()
            });
            setIsBallInPlay(false); // Re-enable button when game ends
        }
    }["App.useCallback[handleGameEnd]"], [
        multipliers,
        calibrateGravity
    ]);
    const runSimulation = (simMultipliers, runs)=>{
        let totalPayout = 0;
        const binCount = simMultipliers.length;
        for(let i = 0; i < runs; i++){
            let position = (binCount - 1) / 2;
            for(let j = 0; j < __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROWS"]; j++){
                position += Math.random() < 0.5 ? -0.5 : 0.5;
            }
            const finalBinIndex = Math.max(0, Math.min(binCount - 1, Math.round(position)));
            totalPayout += simMultipliers[finalBinIndex];
        }
        return totalPayout / runs;
    };
    const handleSimulate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "App.useCallback[handleSimulate]": ()=>{
            // Use deterministic calculation for exact EV
            const ev = calculateExpectedValue(multipliers);
            const houseEdge = (1 - ev) * 100;
            const probabilities = calculateBinProbabilities(multipliers.length);
            let probText = 'Bin Probabilities:\n';
            probabilities.forEach({
                "App.useCallback[handleSimulate]": (prob, i)=>{
                    probText += `Bin ${i}: ${(prob * 100).toFixed(2)}% (${multipliers[i]}x)\n`;
                }
            }["App.useCallback[handleSimulate]"]);
            const resultText = `Expected Value (EV): ${ev.toFixed(4)}\nReturn to Player (RTP): ${(ev * 100).toFixed(2)}%\nHouse Edge: ${houseEdge.toFixed(2)}%\n\n${probText}`;
            setSimulationResult(resultText);
        }
    }["App.useCallback[handleSimulate]"], [
        multipliers,
        calculateExpectedValue,
        calculateBinProbabilities
    ]);
    const handleRecalculateMultipliers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "App.useCallback[handleRecalculateMultipliers]": ()=>{
            setIsCalculating(true);
            setTimeout({
                "App.useCallback[handleRecalculateMultipliers]": ()=>{
                    const baseEV = calculateExpectedValue(multipliers);
                    if (baseEV === 0) {
                        setSimulationResult('Error: Cannot calculate RTP. Check probability calculation.');
                        setIsCalculating(false);
                        return;
                    }
                    const scalingFactor = targetRTP / baseEV;
                    const newMultipliers = multipliers.map({
                        "App.useCallback[handleRecalculateMultipliers].newMultipliers": (m)=>parseFloat((m * scalingFactor).toPrecision(3))
                    }["App.useCallback[handleRecalculateMultipliers].newMultipliers"]);
                    setMultipliers(newMultipliers);
                    const finalEV = calculateExpectedValue(newMultipliers);
                    const houseEdge = (1 - finalEV) * 100;
                    const resultText = `Target RTP: ${(targetRTP * 100).toFixed(2)}%\n---\nActual RTP: ${(finalEV * 100).toFixed(2)}%\nHouse Edge: ${houseEdge.toFixed(2)}%\n\nNew Multipliers:\n${newMultipliers.map({
                        "App.useCallback[handleRecalculateMultipliers]": (m, i)=>`Bin ${i}: ${m.toFixed(2)}x`
                    }["App.useCallback[handleRecalculateMultipliers]"]).join('\n')}`;
                    setSimulationResult(resultText);
                    setIsCalculating(false);
                }
            }["App.useCallback[handleRecalculateMultipliers]"], 50);
        }
    }["App.useCallback[handleRecalculateMultipliers]"], [
        multipliers,
        targetRTP,
        calculateExpectedValue
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-900 text-white flex justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: containerRef,
            className: "relative bg-gradient-to-b from-gray-800 to-black shadow-2xl flex flex-col overflow-hidden w-full",
            style: {
                height: containerHeight || '100vh',
                maxHeight: '100vh'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-4 left-0 right-0 flex justify-center z-10 pointer-events-none",
                    children: lastPayout && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-4xl font-bold",
                        style: {
                            color: '#3e9c35'
                        },
                        children: [
                            "+$",
                            lastPayout.payout.toFixed(2)
                        ]
                    }, lastPayout.key, true, {
                        fileName: "[project]/App.tsx",
                        lineNumber: 286,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/App.tsx",
                    lineNumber: 284,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "absolute top-0 left-0 right-0 px-4 flex justify-end items-center z-20",
                    style: {
                        height: rowSpacing || 'auto',
                        paddingTop: rowSpacing ? `${rowSpacing * 0.25}px` : '1rem',
                        paddingBottom: rowSpacing ? `${rowSpacing * 0.25}px` : '1rem'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsDevToolsVisible(true),
                        className: "bg-purple-700/50 hover:bg-purple-700/80 text-white font-semibold py-1 px-2 rounded-lg text-xs transition-colors",
                        children: "Dev Tools"
                    }, void 0, false, {
                        fileName: "[project]/App.tsx",
                        lineNumber: 296,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/App.tsx",
                    lineNumber: 292,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    ref: mainRef,
                    className: "flex-grow",
                    style: {
                        paddingTop: rowSpacing || 0
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PlinkoBoard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        multipliers: multipliers,
                        playTrigger: playTrigger,
                        onGameEnd: handleGameEnd,
                        gravity: gravity
                    }, void 0, false, {
                        fileName: "[project]/App.tsx",
                        lineNumber: 302,
                        columnNumber: 12
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/App.tsx",
                    lineNumber: 301,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "px-4 bg-gradient-to-t from-black/80 to-transparent flex justify-center items-center",
                    style: {
                        height: rowSpacing || 'auto',
                        paddingTop: rowSpacing ? `${rowSpacing * 0.25}px` : '1rem',
                        paddingBottom: rowSpacing ? `${rowSpacing * 0.25}px` : '1rem'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handlePlay,
                        disabled: balance < BET_AMOUNT || isBallInPlay,
                        className: "w-full text-gray-900 font-bold py-3 rounded-md text-lg uppercase transition-all duration-300 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 disabled:shadow-none",
                        style: {
                            background: balance < BET_AMOUNT || isBallInPlay ? 'linear-gradient(to right, #4b5563, #374151)' : 'linear-gradient(to right, #168118, #157811)',
                            boxShadow: balance < BET_AMOUNT || isBallInPlay ? 'none' : '0 0 5px #168118, 0 0 10px #168118'
                        },
                        onMouseEnter: (e)=>{
                            if (balance >= BET_AMOUNT && !isBallInPlay) {
                                e.currentTarget.style.background = 'linear-gradient(to right, #3e9c35, #168118)';
                            }
                        },
                        onMouseLeave: (e)=>{
                            if (balance >= BET_AMOUNT && !isBallInPlay) {
                                e.currentTarget.style.background = 'linear-gradient(to right, #168118, #157811)';
                            }
                        },
                        children: "PLAY"
                    }, void 0, false, {
                        fileName: "[project]/App.tsx",
                        lineNumber: 314,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/App.tsx",
                    lineNumber: 310,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                isDevToolsVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-4",
                    onClick: ()=>setIsDevToolsVisible(false),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full max-w-md bg-gray-800 rounded-lg shadow-xl",
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 flex justify-between items-center border-b border-gray-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-white",
                                        children: "Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 341,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsDevToolsVisible(false),
                                        className: "text-gray-400 hover:text-white text-2xl leading-none",
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 342,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/App.tsx",
                                lineNumber: 340,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex border-b border-gray-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDevToolsTab('devtools'),
                                        className: `flex-1 py-2 text-sm font-semibold transition-colors ${devToolsTab === 'devtools' ? 'border-b-2' : 'text-gray-400 hover:text-gray-200'}`,
                                        style: devToolsTab === 'devtools' ? {
                                            color: '#3e9c35',
                                            borderColor: '#3e9c35'
                                        } : {},
                                        children: "Dev Tools"
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 346,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDevToolsTab('balance'),
                                        className: `flex-1 py-2 text-sm font-semibold transition-colors ${devToolsTab === 'balance' ? 'border-b-2' : 'text-gray-400 hover:text-gray-200'}`,
                                        style: devToolsTab === 'balance' ? {
                                            color: '#3e9c35',
                                            borderColor: '#3e9c35'
                                        } : {},
                                        children: "Balance"
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 347,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDevToolsTab('history'),
                                        className: `flex-1 py-2 text-sm font-semibold transition-colors ${devToolsTab === 'history' ? 'border-b-2' : 'text-gray-400 hover:text-gray-200'}`,
                                        style: devToolsTab === 'history' ? {
                                            color: '#3e9c35',
                                            borderColor: '#3e9c35'
                                        } : {},
                                        children: "History"
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 348,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/App.tsx",
                                lineNumber: 345,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            devToolsTab === 'devtools' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-900/70 p-3 rounded-md space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-semibold text-base text-white",
                                                children: "Gravity Calibration"
                                            }, void 0, false, {
                                                fileName: "[project]/App.tsx",
                                                lineNumber: 354,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "flex justify-between text-sm text-gray-300",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Current Gravity"
                                                            }, void 0, false, {
                                                                fileName: "[project]/App.tsx",
                                                                lineNumber: 357,
                                                                columnNumber: 39
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono",
                                                                style: {
                                                                    color: '#3e9c35'
                                                                },
                                                                children: gravity.toFixed(3)
                                                            }, void 0, false, {
                                                                fileName: "[project]/App.tsx",
                                                                lineNumber: 358,
                                                                columnNumber: 39
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/App.tsx",
                                                        lineNumber: 356,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 text-xs text-gray-400",
                                                        children: [
                                                            "Distribution: ",
                                                            binDistributionRef.current.reduce((a, b)=>a + b, 0),
                                                            " games tracked"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/App.tsx",
                                                        lineNumber: 360,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/App.tsx",
                                                lineNumber: 355,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 353,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-900/70 p-3 rounded-md space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-semibold text-base text-white",
                                                children: "Game Economy"
                                            }, void 0, false, {
                                                fileName: "[project]/App.tsx",
                                                lineNumber: 366,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "rtp-slider",
                                                        className: "flex justify-between text-sm text-gray-300",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Target RTP"
                                                            }, void 0, false, {
                                                                fileName: "[project]/App.tsx",
                                                                lineNumber: 369,
                                                                columnNumber: 39
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono",
                                                                style: {
                                                                    color: '#3e9c35'
                                                                },
                                                                children: [
                                                                    (targetRTP * 100).toFixed(1),
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/App.tsx",
                                                                lineNumber: 370,
                                                                columnNumber: 39
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/App.tsx",
                                                        lineNumber: 368,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        id: "rtp-slider",
                                                        type: "range",
                                                        min: "0.90",
                                                        max: "1.00",
                                                        step: "0.005",
                                                        value: targetRTP,
                                                        onChange: (e)=>setTargetRTP(parseFloat(e.target.value)),
                                                        className: "w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg mt-1",
                                                        style: {
                                                            accentColor: '#168118'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/App.tsx",
                                                        lineNumber: 372,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/App.tsx",
                                                lineNumber: 367,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleRecalculateMultipliers,
                                                disabled: isCalculating,
                                                className: "w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500 transition-colors disabled:bg-gray-600",
                                                children: isCalculating ? 'Calculating...' : 'Calibrate Multipliers'
                                            }, void 0, false, {
                                                fileName: "[project]/App.tsx",
                                                lineNumber: 376,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 365,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500",
                                        children: "Simulate 100 runs with the current multipliers to see the approximate RTP."
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 380,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSimulate,
                                        className: "w-full text-white px-4 py-2 rounded transition-colors",
                                        style: {
                                            backgroundColor: 'rgba(22, 129, 24, 0.8)'
                                        },
                                        onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = 'rgba(22, 129, 24, 1)',
                                        onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = 'rgba(22, 129, 24, 0.8)',
                                        children: "Check Current RTP"
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 383,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    simulationResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-900 p-3 rounded mt-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                            className: "text-xs text-white whitespace-pre-wrap font-mono",
                                            children: simulationResult
                                        }, void 0, false, {
                                            fileName: "[project]/App.tsx",
                                            lineNumber: 388,
                                            columnNumber: 37
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 387,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/App.tsx",
                                lineNumber: 352,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            devToolsTab === 'balance' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-gray-400",
                                        children: "Current Balance"
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 395,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-3xl mt-1",
                                        children: [
                                            "$",
                                            balance.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 396,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/App.tsx",
                                lineNumber: 394,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            devToolsTab === 'history' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HistoryTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                history: history
                            }, void 0, false, {
                                fileName: "[project]/App.tsx",
                                lineNumber: 400,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/App.tsx",
                        lineNumber: 339,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/App.tsx",
                    lineNumber: 338,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/App.tsx",
            lineNumber: 275,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/App.tsx",
        lineNumber: 274,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(App, "RCvpIUtkDhDBL2tvpci2Psktmq4=");
_c = App;
const __TURBOPACK__default__export__ = App;
var _c;
__turbopack_context__.k.register(_c, "App");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0472aeb9._.js.map