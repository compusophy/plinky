module.exports = [
"[project]/constants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CALIBRATED_MULTIPLIERS",
    ()=>CALIBRATED_MULTIPLIERS,
    "MULTIPLIERS",
    ()=>MULTIPLIERS,
    "MULTIPLIER_COLORS",
    ()=>MULTIPLIER_COLORS,
    "PHYSICS_CALIBRATION_COEFFICIENT",
    ()=>PHYSICS_CALIBRATION_COEFFICIENT,
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
const CALIBRATED_MULTIPLIERS = [
    1.630,
    0.935,
    0.467,
    0.257,
    0.257,
    0.467,
    0.935,
    1.630
];
const PHYSICS_CALIBRATION_COEFFICIENT = 0.8411; // Fallback only - use dev tools calibration for production
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
}),
"[project]/components/PlinkoBoard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/matter-js@0.19.0/node_modules/matter-js/build/matter.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants.ts [app-ssr] (ecmascript)");
;
;
;
;
const PlinkoBoard = ({ multipliers, playTrigger, onGameEnd, gravity })=>{
    const sceneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const engineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const runnerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const lastPlayTrigger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(playTrigger);
    const settledBallsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Set()); // Track multiple settled balls
    const initialBallRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [balls, setBalls] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [winningBin, setWinningBin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [boardElements, setBoardElements] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dimensions, setDimensions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        width: 0,
        height: 0
    });
    const settledBallIdsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Set()); // Track IDs of settled balls to hide them
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!sceneRef.current) return;
        const resizeObserver = new ResizeObserver(()=>{
            if (sceneRef.current) {
                const { width, height } = sceneRef.current.getBoundingClientRect();
                setDimensions({
                    width,
                    height
                });
            }
        });
        resizeObserver.observe(sceneRef.current);
        return ()=>resizeObserver.disconnect();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const { width, height } = dimensions;
        if (width === 0 || height === 0) return;
        const binCount = multipliers.length;
        const pegRows = __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROWS"];
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
                const peg = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Bodies.circle(x, y, pegRadius, {
                    isStatic: true,
                    label: 'peg',
                    restitution: 0.8,
                    friction: 0.01
                });
                staticBodies.push(peg);
                pegElements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    lineNumber: 105,
                    columnNumber: 26
                }, ("TURBOPACK compile-time value", void 0)));
            }
        }
        const binDividerTopY = pegAreaBottom;
        const binWallHeight = vSpacing; // Match row height for uniform spacing
        const binBottomY = binDividerTopY + binWallHeight;
        const floor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Bodies.rectangle(width / 2, binBottomY + ballRadius * 2, width * 3, 4, {
            isStatic: true,
            label: 'floor'
        });
        staticBodies.push(floor);
        for(let i = 0; i < binCount + 1; i++){
            const x = i * hSpacing;
            const pegPart = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Bodies.circle(x, binDividerTopY, pegRadius, {
                isStatic: true,
                restitution: 0.8,
                friction: 0.01
            });
            const wallPart = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Bodies.rectangle(x, binDividerTopY + binWallHeight / 2, pegRadius, binWallHeight, {
                isStatic: true
            });
            const dividerBody = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Body.create({
                parts: [
                    pegPart,
                    wallPart
                ],
                isStatic: true,
                label: 'divider'
            });
            staticBodies.push(dividerBody);
            pegElements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                lineNumber: 122,
                columnNumber: 26
            }, ("TURBOPACK compile-time value", void 0)));
        }
        const binData = [];
        for(let i = 0; i < binCount; i++){
            const sensorX = i * hSpacing + hSpacing / 2;
            const sensorHeight = binWallHeight;
            // Sensor top should align with binDividerTopY (center of divider nodes), so center is at binDividerTopY + sensorHeight/2
            const sensorY = binDividerTopY + sensorHeight / 2;
            const sensor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Bodies.rectangle(sensorX, sensorY, hSpacing, sensorHeight, {
                isStatic: true,
                isSensor: true,
                label: `bin-${i}`
            });
            staticBodies.push(sensor);
            const binFloorX = sensorX;
            const binFloorY = binBottomY - pegRadius / 2;
            const binFloorWidth = hSpacing;
            const binFloorHeight = pegRadius;
            const binFloorBody = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Bodies.rectangle(binFloorX, binFloorY, binFloorWidth, binFloorHeight, {
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
    }, [
        dimensions,
        multipliers
    ]);
    const binElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
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
        return boardElements.binData.map((data, i)=>{
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
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute flex items-center justify-center",
                style: {
                    left: `${data.left}%`,
                    width: `${data.width}%`,
                    bottom: `${data.bottom}px`,
                    height: `${data.height}px`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: binClasses,
                    children: [
                        multiplier.toFixed(2),
                        "x"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/PlinkoBoard.tsx",
                    lineNumber: 187,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, `b-${i}`, false, {
                fileName: "[project]/components/PlinkoBoard.tsx",
                lineNumber: 186,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0));
        });
    }, [
        boardElements,
        winningBin,
        multipliers
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const engine = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Engine.create({
            gravity: {
                y: gravity
            }
        });
        // Speed up simulation by increasing timeScale (2x faster)
        engine.timing.timeScale = 2.0;
        const runner = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Runner.create();
        engineRef.current = engine;
        runnerRef.current = runner;
        if (!boardElements) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Composite.add(engine.world, boardElements.staticBodies);
        // Create initial static ball at starting position
        const { ballStartX, ballStartY, ballRadius } = boardElements;
        const initialBall = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Bodies.circle(ballStartX, ballStartY, ballRadius, {
            label: 'ball',
            isStatic: true,
            collisionFilter: {
                group: -1,
                category: 0x0001,
                mask: 0xFFFF
            }
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Composite.add(engine.world, initialBall);
        initialBallRef.current = initialBall;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Runner.run(runner, engine);
        let animationFrameId;
        const update = ()=>{
            if (!engineRef.current) return;
            const updatedBalls = {};
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Composite.allBodies(engineRef.current.world).forEach((body)=>{
                if (body.label === 'ball' && !settledBallIdsRef.current.has(body.id)) {
                    updatedBalls[body.id] = {
                        x: body.position.x,
                        y: body.position.y,
                        angle: body.angle
                    };
                }
            });
            setBalls(updatedBalls);
            animationFrameId = requestAnimationFrame(update);
        };
        update();
        const collisionHandler = (event)=>{
            for (const pair of event.pairs){
                const { bodyA, bodyB } = pair;
                const ball = bodyA.label === 'ball' ? bodyA : bodyB.label === 'ball' ? bodyB : null;
                if (!ball || ball.isSettled) continue;
                const binSensor = bodyA.label.startsWith('bin-') ? bodyA : bodyB.label.startsWith('bin-') ? bodyB : null;
                const floor = bodyA.label === 'floor' ? bodyA : bodyB.label === 'floor' ? bodyB : null;
                const handleSettled = (binIndex)=>{
                    if (ball.isSettled) return;
                    ball.isSettled = true;
                    settledBallsRef.current.add(ball);
                    settledBallIdsRef.current.add(ball.id); // Mark this ball ID as settled
                    // Remove settled ball from rendering immediately
                    setBalls((prev)=>{
                        const updated = {
                            ...prev
                        };
                        delete updated[ball.id];
                        return updated;
                    });
                    onGameEnd(binIndex);
                    // Only set winning bin for the most recent ball (optional - could show multiple)
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
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Events.on(engine, 'collisionStart', collisionHandler);
        return ()=>{
            cancelAnimationFrame(animationFrameId);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Events.off(engine, 'collisionStart', collisionHandler);
            if (runner) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Runner.stop(runner);
            if (engine) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Engine.clear(engine);
        };
    }, [
        boardElements,
        onGameEnd
    ]);
    // Update gravity dynamically
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (engineRef.current) {
            engineRef.current.world.gravity.y = gravity;
        }
    }, [
        gravity
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (playTrigger > lastPlayTrigger.current) {
            lastPlayTrigger.current = playTrigger;
            // Remove initial static ball if it exists (only on first play)
            if (initialBallRef.current && engineRef.current) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].World.remove(engineRef.current.world, initialBallRef.current);
                initialBallRef.current = null;
            }
            // Don't clear winningBin - allow multiple balls to show their results
            // setWinningBin(null);
            if (engineRef.current && boardElements) {
                const { ballStartX, ballStartY, ballRadius } = boardElements;
                const randomOffset = (Math.random() - 0.5) * ballRadius * 0.1;
                const x = ballStartX + randomOffset;
                const ball = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Bodies.circle(x, ballStartY, ballRadius, {
                    label: 'ball',
                    restitution: 0.9,
                    friction: 0.001,
                    slop: 0.1,
                    density: 0.01,
                    collisionFilter: {
                        group: -1,
                        category: 0x0001,
                        mask: 0xFFFF
                    }
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$matter$2d$js$40$0$2e$19$2e$0$2f$node_modules$2f$matter$2d$js$2f$build$2f$matter$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Composite.add(engineRef.current.world, ball);
            }
        }
    }, [
        playTrigger,
        boardElements
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: sceneRef,
        className: "relative w-full h-full overflow-hidden",
        children: [
            boardElements?.pegElements,
            binElements,
            Object.keys(balls).map((id)=>{
                const ballId = parseInt(id);
                // Don't render settled balls
                if (settledBallIdsRef.current.has(ballId)) {
                    return null;
                }
                const pos = balls[id];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    lineNumber: 337,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            })
        ]
    }, void 0, true, {
        fileName: "[project]/components/PlinkoBoard.tsx",
        lineNumber: 326,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = PlinkoBoard;
}),
"[project]/components/HistoryTable.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
const HistoryTable = ({ history, totalGames, totalPayout })=>{
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (totalGames === 0) {
            return {
                totalGames: 0,
                totalPayout: 0,
                totalBets: 0,
                actualEV: 0,
                actualRTP: 0,
                totalProfit: 0
            };
        }
        const totalBets = totalGames; // Each game costs 1
        const totalProfit = totalPayout - totalBets; // Total payout - total bets
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
    }, [
        totalGames,
        totalPayout
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 space-y-4",
        children: [
            totalGames > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-900/70 p-3 rounded-md space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-semibold text-base text-white mb-3",
                        children: "Actual Statistics"
                    }, void 0, false, {
                        fileName: "[project]/components/HistoryTable.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-gray-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Total Games:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-gray-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Total Bets:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-gray-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Total Payout:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-gray-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Total Profit:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 57,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono font-semibold",
                                        style: {
                                            color: stats.totalProfit >= 0 ? '#3e9c35' : '#ef4444'
                                        },
                                        children: [
                                            stats.totalProfit >= 0 ? '+' : '-',
                                            "$",
                                            Math.abs(stats.totalProfit).toFixed(2)
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-gray-700 pt-2 mt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-gray-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Actual EV (Avg Payout):"
                                            }, void 0, false, {
                                                fileName: "[project]/components/HistoryTable.tsx",
                                                lineNumber: 64,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-gray-300 mt-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Actual RTP:"
                                            }, void 0, false, {
                                                fileName: "[project]/components/HistoryTable.tsx",
                                                lineNumber: 68,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-y-auto max-h-[60vh]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full text-sm text-left text-gray-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "text-xs text-gray-400 uppercase bg-gray-700/50 sticky top-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        scope: "col",
                                        className: "px-4 py-2 font-mono",
                                        children: "Multiplier"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 79,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        scope: "col",
                                        className: "px-4 py-2 font-mono",
                                        children: "Payout"
                                    }, void 0, false, {
                                        fileName: "[project]/components/HistoryTable.tsx",
                                        lineNumber: 80,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: [
                                history.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
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
                                history.map((result)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-gray-700 hover:bg-gray-700/50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-4 py-2 font-mono text-right font-semibold",
                                                style: {
                                                    color: result.profit >= 0 ? '#3e9c35' : '#ef4444'
                                                },
                                                children: [
                                                    result.profit >= 0 ? '+' : '-',
                                                    "$",
                                                    Math.abs(result.profit).toFixed(2)
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
const __TURBOPACK__default__export__ = HistoryTable;
}),
"[project]/App.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.3_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$farcaster$2b$miniapp$2d$sdk$40$0$2e$2$2e$1_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$farcaster$2f$miniapp$2d$sdk$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@farcaster+miniapp-sdk@0.2.1_typescript@5.8.3/node_modules/@farcaster/miniapp-sdk/dist/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$farcaster$2b$miniapp$2d$sdk$40$0$2e$2$2e$1_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$farcaster$2f$miniapp$2d$sdk$2f$dist$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/@farcaster+miniapp-sdk@0.2.1_typescript@5.8.3/node_modules/@farcaster/miniapp-sdk/dist/sdk.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PlinkoBoard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PlinkoBoard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HistoryTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/HistoryTable.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const App = ()=>{
    const [balance, setBalance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1000);
    // Use calibrated multipliers if available, otherwise use base multipliers
    const [multipliers, setMultipliers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CALIBRATED_MULTIPLIERS"].length > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CALIBRATED_MULTIPLIERS"] : __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MULTIPLIERS"]);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [playTrigger, setPlayTrigger] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isDevToolsVisible, setIsDevToolsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [devToolsTab, setDevToolsTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('devtools');
    const [lastPayout, setLastPayout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [simulationResult, setSimulationResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [targetRTP, setTargetRTP] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0.95);
    const [isCalculating, setIsCalculating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [notification, setNotification] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const mainRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [rowSpacing, setRowSpacing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [containerHeight, setContainerHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // Gravity calibration state - keep stable to maintain correct physics
    const [gravity, setGravity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0.1);
    const binDistributionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]); // Track wins per bin (cumulative, never reset)
    const totalLossesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0); // Track losses (ball hits floor) (cumulative)
    const calibrationHistoryRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]); // Track calibration history
    const totalGamesPlayedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0); // Track all games played (cumulative, never reset)
    const totalPayoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0); // Track total payout across all games (cumulative)
    const lastCalibrationGamesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0); // Track games since last calibration
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
    const calculateBinProbabilities = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((binCount)=>{
        const probabilities = new Array(binCount).fill(0);
        const totalPaths = Math.pow(2, __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROWS"]);
        // Starting position is center: (binCount - 1) / 2
        const centerPos = (binCount - 1) / 2;
        // For each possible number of right moves (0 to ROWS)
        for(let rightMoves = 0; rightMoves <= __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROWS"]; rightMoves++){
            const leftMoves = __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROWS"] - rightMoves;
            // Calculate final position: center + (rightMoves - leftMoves) * 0.5
            // Each move shifts by 0.5 positions
            const finalPosition = centerPos + (rightMoves - leftMoves) * 0.5;
            // Round to nearest bin (bins are at integer positions 0, 1, 2, ..., binCount-1)
            const targetBin = Math.round(finalPosition);
            // Clamp to valid bin range
            if (targetBin >= 0 && targetBin < binCount) {
                const ways = binomialCoefficient(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROWS"], rightMoves);
                probabilities[targetBin] += ways / totalPaths;
            }
        }
        return probabilities;
    }, []);
    // Calculate expected value deterministically
    const calculateExpectedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((multipliers)=>{
        const probabilities = calculateBinProbabilities(multipliers.length);
        let ev = 0;
        for(let i = 0; i < multipliers.length; i++){
            ev += probabilities[i] * multipliers[i];
        }
        return ev;
    }, [
        calculateBinProbabilities
    ]);
    // Call sdk.ready() to clear the splash screen
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f40$farcaster$2b$miniapp$2d$sdk$40$0$2e$2$2e$1_typescript$40$5$2e$8$2e$3$2f$node_modules$2f40$farcaster$2f$miniapp$2d$sdk$2f$dist$2f$sdk$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sdk"].actions.ready().catch((error)=>{
            // Silently fail if not in a Mini App context
            console.debug('Failed to call sdk.ready():', error);
        });
    }, []);
    // Initialize bin distribution tracking (only on mount, never reset)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (binDistributionRef.current.length === 0) {
            binDistributionRef.current = new Array(multipliers.length).fill(0);
            totalLossesRef.current = 0;
            lastCalibrationGamesRef.current = 0;
        } else if (binDistributionRef.current.length !== multipliers.length) {
            // If multiplier count changed, resize but preserve existing data
            const oldLength = binDistributionRef.current.length;
            binDistributionRef.current = [
                ...binDistributionRef.current,
                ...new Array(multipliers.length - oldLength).fill(0)
            ];
        }
    }, [
        multipliers.length
    ]);
    // Auto-calibrate multipliers on mount ONLY if no calibrated multipliers exist
    // If CALIBRATED_MULTIPLIERS is set, use those directly (they're already calibrated)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // If we already have calibrated multipliers, use them and skip auto-calibration
        if (__TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CALIBRATED_MULTIPLIERS"].length > 0) {
            console.log('Using pre-calibrated multipliers:', __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CALIBRATED_MULTIPLIERS"]);
            return;
        }
        // Otherwise, apply initial calibration from base multipliers
        const baseEV = calculateExpectedValue(__TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MULTIPLIERS"]);
        if (baseEV > 0) {
            // Step 1: Scale to target RTP (95%)
            const targetRTPFactor = 0.95 / baseEV;
            // Step 2: Apply physics calibration coefficient to account for Matter.js physics differences
            const finalScalingFactor = targetRTPFactor * __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PHYSICS_CALIBRATION_COEFFICIENT"];
            const newMultipliers = __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MULTIPLIERS"].map((m)=>parseFloat((m * finalScalingFactor).toPrecision(3)));
            setMultipliers(newMultipliers);
            console.log('Auto-calibrated multipliers (dev mode):', {
                baseEV: baseEV.toFixed(4),
                targetRTPFactor: targetRTPFactor.toFixed(4),
                physicsCoeff: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PHYSICS_CALIBRATION_COEFFICIENT"],
                finalScalingFactor: finalScalingFactor.toFixed(4),
                multipliers: newMultipliers
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount
    // Calculate multipliers based on actual game distribution to achieve target RTP
    // Uses PID-like control with cumulative tracking and gradual adjustments
    const calibrateFromActualData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const totalGames = totalGamesPlayedRef.current;
        const gamesSinceLastCalibration = totalGames - lastCalibrationGamesRef.current;
        if (gamesSinceLastCalibration < 50) {
            setNotification({
                message: `Need at least 50 new games since last calibration. You have ${gamesSinceLastCalibration} new games.`,
                type: 'error'
            });
            setTimeout(()=>setNotification(null), 5000);
            return;
        }
        // Calculate actual probability distribution from ALL cumulative games
        const actualProbs = [];
        const totalWins = binDistributionRef.current.reduce((a, b)=>a + b, 0);
        if (totalGames === 0 || totalWins === 0) {
            setNotification({
                message: 'Cannot calibrate: no wins recorded.',
                type: 'error'
            });
            setTimeout(()=>setNotification(null), 5000);
            return;
        }
        for(let i = 0; i < multipliers.length; i++){
            actualProbs.push(binDistributionRef.current[i] / totalGames);
        }
        // Calculate current RTP with actual distribution and current multipliers
        let currentRTP = 0;
        for(let i = 0; i < multipliers.length; i++){
            currentRTP += actualProbs[i] * multipliers[i];
        }
        // Calculate error (difference from target)
        const error = targetRTP - currentRTP;
        const errorPercent = error / targetRTP * 100;
        // PID-like control: Use proportional term with learning rate to prevent oscillation
        // More aggressive learning rate when far from target, conservative when close
        // Formula: learningRate = min(0.8, max(0.2, errorPercent / 50))
        // This means: 20% min, up to 80% max, scales with error
        // At 11% error: ~22% learning rate (was 11%)
        // At 50% error: 80% learning rate
        // At 5% error: 20% learning rate (conservative)
        const learningRate = Math.min(0.8, Math.max(0.2, Math.abs(errorPercent) / 50));
        // Calculate desired scale factor
        const desiredScaleFactor = targetRTP / currentRTP;
        // Apply learning rate: only adjust by a fraction to prevent oscillation
        // Instead of: newMultiplier = oldMultiplier * desiredScaleFactor
        // We do: newMultiplier = oldMultiplier * (1 + learningRate * (desiredScaleFactor - 1))
        // This makes gradual adjustments
        const adjustmentFactor = 1 + learningRate * (desiredScaleFactor - 1);
        // Apply gradual adjustment to multipliers
        const calibratedMultipliers = multipliers.map((m)=>parseFloat((m * adjustmentFactor).toPrecision(3)));
        setMultipliers(calibratedMultipliers);
        // Record calibration history (keep last 10)
        calibrationHistoryRef.current.push({
            rtp: currentRTP,
            scaleFactor: adjustmentFactor,
            games: gamesSinceLastCalibration
        });
        if (calibrationHistoryRef.current.length > 10) {
            calibrationHistoryRef.current.shift();
        }
        // Update last calibration point
        lastCalibrationGamesRef.current = totalGames;
        // Calculate expected new RTP (approximate)
        const expectedNewRTP = currentRTP * adjustmentFactor;
        setNotification({
            message: `Calibrated (${gamesSinceLastCalibration} new games, ${totalGames} total). Current RTP: ${(currentRTP * 100).toFixed(2)}% → Expected: ${(expectedNewRTP * 100).toFixed(2)}% (Target: ${(targetRTP * 100).toFixed(2)}%). Adjustment: ${(adjustmentFactor * 100).toFixed(2)}% (learning rate: ${(learningRate * 100).toFixed(1)}%)`,
            type: 'success'
        });
        setTimeout(()=>setNotification(null), 8000);
    }, [
        multipliers,
        targetRTP
    ]);
    // Force calibration: apply full adjustment instead of gradual (for when close but not quite there)
    const forceCalibrate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const totalGames = totalGamesPlayedRef.current;
        if (totalGames < 50) {
            setNotification({
                message: `Need at least 50 games. You have ${totalGames} games.`,
                type: 'error'
            });
            setTimeout(()=>setNotification(null), 5000);
            return;
        }
        const actualProbs = [];
        const totalWins = binDistributionRef.current.reduce((a, b)=>a + b, 0);
        if (totalGames === 0 || totalWins === 0) {
            setNotification({
                message: 'Cannot calibrate: no wins recorded.',
                type: 'error'
            });
            setTimeout(()=>setNotification(null), 5000);
            return;
        }
        for(let i = 0; i < multipliers.length; i++){
            actualProbs.push(binDistributionRef.current[i] / totalGames);
        }
        let currentRTP = 0;
        for(let i = 0; i < multipliers.length; i++){
            currentRTP += actualProbs[i] * multipliers[i];
        }
        if (currentRTP === 0) {
            setNotification({
                message: 'Cannot calibrate: no wins recorded.',
                type: 'error'
            });
            setTimeout(()=>setNotification(null), 5000);
            return;
        }
        // Force full adjustment to target
        const scaleFactor = targetRTP / currentRTP;
        const calibratedMultipliers = multipliers.map((m)=>parseFloat((m * scaleFactor).toPrecision(3)));
        setMultipliers(calibratedMultipliers);
        lastCalibrationGamesRef.current = totalGames;
        setNotification({
            message: `Force calibrated (${totalGames} games). RTP: ${(currentRTP * 100).toFixed(2)}% → Target: ${(targetRTP * 100).toFixed(2)}%. Scale: ${(scaleFactor * 100).toFixed(2)}%`,
            type: 'success'
        });
        setTimeout(()=>setNotification(null), 8000);
    }, [
        multipliers,
        targetRTP
    ]);
    // Export calibrated multipliers to constants.ts (dev tool)
    const exportCalibratedMultipliers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const multiplierString = multipliers.map((m)=>m.toFixed(3)).join(', ');
        const codeToCopy = `export const CALIBRATED_MULTIPLIERS: number[] = [${multiplierString}];`;
        // Copy to clipboard
        navigator.clipboard.writeText(codeToCopy).then(()=>{
            setNotification({
                message: `Calibrated multipliers copied to clipboard! Paste into constants.ts:\n\n${codeToCopy}\n\nAfter saving, reload the page to use pre-calibrated multipliers.`,
                type: 'success'
            });
            setTimeout(()=>setNotification(null), 12000);
        }).catch(()=>{
            // Fallback: show in alert-style notification
            setNotification({
                message: `Copy this to constants.ts:\n\n${codeToCopy}`,
                type: 'info'
            });
            setTimeout(()=>setNotification(null), 15000);
        });
    }, [
        multipliers
    ]);
    // Calculate perfect container height based on width for even row divisions
    // Container = header (vSpacing) + main + footer (vSpacing)
    // Main = space above ball (vSpacing) + ball-to-row0 (vSpacing) + between rows (ROWS-1)*vSpacing + space after last peg (vSpacing) + to bins (vSpacing) = (ROWS+3)*vSpacing
    // So: containerHeight = 2*vSpacing + (ROWS+3)*vSpacing + bottomPadding = (ROWS+5)*vSpacing + bottomPadding
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const updateContainer = ()=>{
            if (!containerRef.current) return;
            const width = containerRef.current.clientWidth || window.innerWidth;
            const binCount = multipliers.length;
            const hSpacing = width / binCount;
            const bottomPadding = hSpacing;
            const screenHeight = window.innerHeight;
            const totalSpacings = __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROWS"] + 5; // header + above ball + between rows + after last peg + to bins + footer
            // Calculate vSpacing that fits screen
            const estimatedVSpacing = (screenHeight - bottomPadding) / totalSpacings;
            // Calculate perfect container height (must be exactly divisible)
            const perfectHeight = estimatedVSpacing * totalSpacings + bottomPadding;
            // Constrain to screen but keep perfect division
            const finalHeight = Math.min(perfectHeight, screenHeight);
            const finalVSpacing = (finalHeight - bottomPadding) / totalSpacings;
            setContainerHeight(finalHeight);
            setRowSpacing(finalVSpacing);
        };
        // Wait for container to be rendered
        const timeoutId = setTimeout(updateContainer, 0);
        window.addEventListener('resize', updateContainer);
        return ()=>{
            clearTimeout(timeoutId);
            window.removeEventListener('resize', updateContainer);
        };
    }, [
        multipliers
    ]);
    const handlePlay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (balance < BET_AMOUNT) {
            return;
        }
        setLastPayout(null); // Clear payout display when starting new play
        setBalance((prev)=>prev - BET_AMOUNT);
        setPlayTrigger((prev)=>prev + 1);
    }, [
        balance
    ]);
    // Calculate expected distribution (binomial)
    const getExpectedDistribution = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        return calculateBinProbabilities(multipliers.length);
    }, [
        multipliers.length,
        calculateBinProbabilities
    ]);
    // Disabled auto-calibration - gravity changes affect physics and break RTP
    // Multipliers are auto-calibrated on mount using PHYSICS_CALIBRATION_COEFFICIENT
    const calibrateGravity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
    // Auto-calibration disabled - keeping gravity stable at 0.1
    }, []);
    const handleGameEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((finalBinIndex)=>{
        const isLoss = finalBinIndex === -1;
        const multiplier = isLoss ? 0 : multipliers[finalBinIndex];
        const payout = BET_AMOUNT * multiplier;
        const profit = payout - BET_AMOUNT;
        // Track distribution for calibration
        if (isLoss) {
            totalLossesRef.current++;
        } else if (finalBinIndex >= 0 && finalBinIndex < multipliers.length) {
            binDistributionRef.current[finalBinIndex]++;
        }
        // Track all games and total payout for accurate RTP calculation
        totalGamesPlayedRef.current++;
        totalPayoutRef.current += payout;
        setBalance((prev)=>prev + payout);
        const newResult = {
            id: Date.now() + Math.random(),
            multiplier,
            payout,
            profit
        };
        // Store all games in history (no limit)
        setHistory((prev)=>[
                newResult,
                ...prev
            ]);
        setLastPayout({
            payout,
            key: Date.now()
        });
    }, [
        multipliers,
        calibrateGravity
    ]);
    const runSimulation = (simMultipliers, runs)=>{
        let totalPayout = 0;
        const binCount = simMultipliers.length;
        for(let i = 0; i < runs; i++){
            let position = (binCount - 1) / 2;
            for(let j = 0; j < __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROWS"]; j++){
                position += Math.random() < 0.5 ? -0.5 : 0.5;
            }
            const finalBinIndex = Math.max(0, Math.min(binCount - 1, Math.round(position)));
            totalPayout += simMultipliers[finalBinIndex];
        }
        return totalPayout / runs;
    };
    const handleSimulate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setIsCalculating(true);
        // Show actual game history RTP if available - use all games played, not just history array
        let actualHistoryRTP = null;
        const totalGamesPlayed = totalGamesPlayedRef.current;
        if (totalGamesPlayed > 0) {
            actualHistoryRTP = totalPayoutRef.current / totalGamesPlayed;
        }
        setSimulationResult('Running simulations...\nThis may take a moment...');
        // Run simulations - track both bin indices and payouts
        const binIndices = [];
        const simulationPayouts = [];
        const binCount = multipliers.length;
        // Simulate 200 games for better accuracy
        for(let i = 0; i < 200; i++){
            let position = (binCount - 1) / 2;
            for(let j = 0; j < __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROWS"]; j++){
                position += Math.random() < 0.5 ? -0.5 : 0.5;
            }
            const finalBinIndex = Math.max(0, Math.min(binCount - 1, Math.round(position)));
            binIndices.push(finalBinIndex);
            simulationPayouts.push(multipliers[finalBinIndex]);
        }
        // Calculate RTP from simulation results
        const totalPayout = simulationPayouts.reduce((sum, payout)=>sum + payout, 0);
        const simulationRTP = totalPayout / 200;
        const houseEdge = (1 - simulationRTP) * 100;
        // Count bin distribution
        const binCounts = new Array(binCount).fill(0);
        binIndices.forEach((binIdx)=>{
            binCounts[binIdx]++;
        });
        // Compare with theoretical
        const theoreticalEV = calculateExpectedValue(multipliers);
        const theoreticalRTP = theoreticalEV;
        let resultText = `=== RTP ANALYSIS ===\n\n`;
        if (actualHistoryRTP !== null) {
            resultText += `🎯 ACTUAL GAME RTP (${totalGamesPlayed} games): ${(actualHistoryRTP * 100).toFixed(2)}%\n`;
            resultText += `   This is REAL data from your games!\n\n`;
        }
        resultText += `📊 Simulation RTP (200 games): ${(simulationRTP * 100).toFixed(2)}%\n`;
        resultText += `📐 Theoretical RTP (math): ${(theoreticalRTP * 100).toFixed(2)}%\n`;
        resultText += `📉 Difference: ${((simulationRTP - theoreticalRTP) * 100).toFixed(2)}%\n`;
        resultText += `💰 House Edge: ${houseEdge.toFixed(2)}%\n\n`;
        if (actualHistoryRTP !== null) {
            const diffFromActual = (simulationRTP - actualHistoryRTP) * 100;
            resultText += `⚠️  Simulation vs Actual: ${diffFromActual > 0 ? '+' : ''}${diffFromActual.toFixed(2)}%\n`;
            resultText += `   (Simulation may not match physics exactly)\n\n`;
        }
        resultText += `Bin Distribution (from simulation):\n`;
        binCounts.forEach((count, i)=>{
            const percentage = count / 200 * 100;
            resultText += `Bin ${i}: ${count} games (${percentage.toFixed(1)}%) → ${multipliers[i]}x\n`;
        });
        if (totalGamesPlayed >= 50 && actualHistoryRTP !== null) {
            // Calculate actual bin probabilities
            const actualProbs = [];
            const totalWins = binDistributionRef.current.reduce((a, b)=>a + b, 0);
            for(let i = 0; i < multipliers.length; i++){
                actualProbs.push(binDistributionRef.current[i] / totalGamesPlayed);
            }
            // Calculate what RTP would be with current multipliers and actual distribution
            let actualRTPWithCurrentMultipliers = 0;
            for(let i = 0; i < multipliers.length; i++){
                actualRTPWithCurrentMultipliers += actualProbs[i] * multipliers[i];
            }
            const error = targetRTP - actualRTPWithCurrentMultipliers;
            const errorPercent = error / targetRTP * 100;
            resultText += `\n\n🔧 CALIBRATION INFO (Cumulative):\n`;
            resultText += `   Total Games: ${totalGamesPlayed} (${totalGamesPlayed - lastCalibrationGamesRef.current} since last calibration)\n`;
            resultText += `   Current RTP (actual games): ${(actualHistoryRTP * 100).toFixed(2)}%\n`;
            resultText += `   Current RTP (with actual distribution): ${(actualRTPWithCurrentMultipliers * 100).toFixed(2)}%\n`;
            resultText += `   Target RTP: ${(targetRTP * 100).toFixed(2)}%\n`;
            resultText += `   Error: ${errorPercent > 0 ? '+' : ''}${errorPercent.toFixed(2)}%\n\n`;
            if (calibrationHistoryRef.current.length > 0) {
                resultText += `   Calibration History (last ${calibrationHistoryRef.current.length}):\n`;
                calibrationHistoryRef.current.slice(-5).forEach((cal, idx)=>{
                    resultText += `     ${idx + 1}. RTP: ${(cal.rtp * 100).toFixed(2)}%, Scale: ${(cal.scaleFactor * 100).toFixed(2)}%, Games: ${cal.games}\n`;
                });
            }
            resultText += `\n   Actual Bin Distribution (cumulative):\n`;
            actualProbs.forEach((prob, i)=>{
                resultText += `     Bin ${i}: ${(prob * 100).toFixed(1)}% (${binDistributionRef.current[i]} games)\n`;
            });
        } else if (totalGamesPlayed < 50) {
            resultText += `\n💡 Tip: Play 50+ games to see calibration recommendations.`;
        }
        setSimulationResult(resultText);
        setIsCalculating(false);
    }, [
        multipliers,
        calculateExpectedValue,
        targetRTP
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-900 text-white flex justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: containerRef,
            className: "relative bg-gradient-to-b from-gray-800 to-black shadow-2xl flex flex-col overflow-hidden w-full",
            style: {
                height: containerHeight || '100vh',
                maxHeight: '100vh'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-4 left-0 right-0 flex justify-center z-10 pointer-events-none",
                    children: lastPayout && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        lineNumber: 533,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/App.tsx",
                    lineNumber: 531,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                notification && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-auto max-w-md w-full px-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `p-4 rounded-lg shadow-lg border-2 ${notification.type === 'success' ? 'bg-green-900/95 border-green-600 text-green-100' : notification.type === 'error' ? 'bg-red-900/95 border-red-600 text-red-100' : 'bg-blue-900/95 border-blue-600 text-blue-100'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium flex-1",
                                    children: notification.message
                                }, void 0, false, {
                                    fileName: "[project]/App.tsx",
                                    lineNumber: 551,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setNotification(null),
                                    className: "ml-4 text-lg leading-none opacity-70 hover:opacity-100",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/App.tsx",
                                    lineNumber: 552,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/App.tsx",
                            lineNumber: 550,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/App.tsx",
                        lineNumber: 541,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/App.tsx",
                    lineNumber: 540,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "absolute top-0 left-0 right-0 px-4 flex justify-end items-center z-20",
                    style: {
                        height: rowSpacing || 'auto',
                        paddingTop: rowSpacing ? `${rowSpacing * 0.25}px` : '1rem',
                        paddingBottom: rowSpacing ? `${rowSpacing * 0.25}px` : '1rem'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsDevToolsVisible(true),
                        className: "bg-purple-700/50 hover:bg-purple-700/80 text-white font-semibold py-1 px-2 rounded-lg text-xs transition-colors",
                        children: "Dev Tools"
                    }, void 0, false, {
                        fileName: "[project]/App.tsx",
                        lineNumber: 567,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/App.tsx",
                    lineNumber: 563,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    ref: mainRef,
                    className: "flex-grow",
                    style: {
                        paddingTop: rowSpacing || 0
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PlinkoBoard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        multipliers: multipliers,
                        playTrigger: playTrigger,
                        onGameEnd: handleGameEnd,
                        gravity: gravity
                    }, void 0, false, {
                        fileName: "[project]/App.tsx",
                        lineNumber: 573,
                        columnNumber: 12
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/App.tsx",
                    lineNumber: 572,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "px-4 bg-gradient-to-t from-black/80 to-transparent flex justify-center items-center",
                    style: {
                        height: rowSpacing || 'auto',
                        paddingTop: rowSpacing ? `${rowSpacing * 0.25}px` : '1rem',
                        paddingBottom: rowSpacing ? `${rowSpacing * 0.25}px` : '1rem'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handlePlay,
                        disabled: balance < BET_AMOUNT,
                        className: "w-full text-gray-900 font-bold py-3 rounded-md text-lg uppercase transition-all duration-300 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 disabled:shadow-none",
                        style: {
                            background: balance < BET_AMOUNT ? 'linear-gradient(to right, #4b5563, #374151)' : 'linear-gradient(to right, #168118, #157811)',
                            boxShadow: balance < BET_AMOUNT ? 'none' : '0 0 5px #168118, 0 0 10px #168118'
                        },
                        onMouseEnter: (e)=>{
                            if (balance >= BET_AMOUNT) {
                                e.currentTarget.style.background = 'linear-gradient(to right, #3e9c35, #168118)';
                            }
                        },
                        onMouseLeave: (e)=>{
                            if (balance >= BET_AMOUNT) {
                                e.currentTarget.style.background = 'linear-gradient(to right, #168118, #157811)';
                            }
                        },
                        children: "PLAY"
                    }, void 0, false, {
                        fileName: "[project]/App.tsx",
                        lineNumber: 585,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/App.tsx",
                    lineNumber: 581,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                isDevToolsVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-2 sm:p-4 overflow-y-auto",
                    onClick: ()=>setIsDevToolsVisible(false),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full max-w-md bg-gray-800 rounded-lg shadow-xl flex flex-col max-h-[95vh] my-auto",
                        onClick: (e)=>e.stopPropagation(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 flex justify-between items-center border-b border-gray-700 flex-shrink-0 sticky top-0 bg-gray-800 z-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-white",
                                        children: "Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 612,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsDevToolsVisible(false),
                                        className: "text-gray-400 hover:text-white text-2xl leading-none font-bold",
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 613,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/App.tsx",
                                lineNumber: 611,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex border-b border-gray-700 flex-shrink-0 bg-gray-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDevToolsTab('devtools'),
                                        className: `flex-1 py-2 text-sm font-semibold transition-colors ${devToolsTab === 'devtools' ? 'border-b-2' : 'text-gray-400 hover:text-gray-200'}`,
                                        style: devToolsTab === 'devtools' ? {
                                            color: '#3e9c35',
                                            borderColor: '#3e9c35'
                                        } : {},
                                        children: "Dev Tools"
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 617,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDevToolsTab('balance'),
                                        className: `flex-1 py-2 text-sm font-semibold transition-colors ${devToolsTab === 'balance' ? 'border-b-2' : 'text-gray-400 hover:text-gray-200'}`,
                                        style: devToolsTab === 'balance' ? {
                                            color: '#3e9c35',
                                            borderColor: '#3e9c35'
                                        } : {},
                                        children: "Balance"
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 618,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setDevToolsTab('history'),
                                        className: `flex-1 py-2 text-sm font-semibold transition-colors ${devToolsTab === 'history' ? 'border-b-2' : 'text-gray-400 hover:text-gray-200'}`,
                                        style: devToolsTab === 'history' ? {
                                            color: '#3e9c35',
                                            borderColor: '#3e9c35'
                                        } : {},
                                        children: "History"
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 619,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/App.tsx",
                                lineNumber: 616,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-y-auto flex-1 min-h-0",
                                children: [
                                    devToolsTab === 'devtools' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-gray-900/70 p-3 rounded-md space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-semibold text-base text-white",
                                                        children: "Gravity Calibration"
                                                    }, void 0, false, {
                                                        fileName: "[project]/App.tsx",
                                                        lineNumber: 627,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "flex justify-between text-sm text-gray-300",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Current Gravity"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/App.tsx",
                                                                        lineNumber: 630,
                                                                        columnNumber: 39
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-mono",
                                                                        style: {
                                                                            color: '#3e9c35'
                                                                        },
                                                                        children: gravity.toFixed(3)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/App.tsx",
                                                                        lineNumber: 631,
                                                                        columnNumber: 39
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/App.tsx",
                                                                lineNumber: 629,
                                                                columnNumber: 37
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-2 text-xs text-gray-400",
                                                                children: [
                                                                    "Distribution: ",
                                                                    binDistributionRef.current.reduce((a, b)=>a + b, 0),
                                                                    " games tracked"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/App.tsx",
                                                                lineNumber: 633,
                                                                columnNumber: 37
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/App.tsx",
                                                        lineNumber: 628,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/App.tsx",
                                                lineNumber: 626,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-gray-900/70 p-3 rounded-md space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-semibold text-base text-white",
                                                        children: "RTP Analysis"
                                                    }, void 0, false, {
                                                        fileName: "[project]/App.tsx",
                                                        lineNumber: 639,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-400",
                                                        children: "Check actual RTP from game history and simulations. Multipliers are auto-calibrated on load."
                                                    }, void 0, false, {
                                                        fileName: "[project]/App.tsx",
                                                        lineNumber: 640,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: handleSimulate,
                                                        disabled: isCalculating,
                                                        className: "w-full text-white px-4 py-2 rounded transition-colors disabled:bg-gray-600 mb-2",
                                                        style: {
                                                            backgroundColor: 'rgba(22, 129, 24, 0.8)'
                                                        },
                                                        onMouseEnter: (e)=>!isCalculating && (e.currentTarget.style.backgroundColor = 'rgba(22, 129, 24, 1)'),
                                                        onMouseLeave: (e)=>!isCalculating && (e.currentTarget.style.backgroundColor = 'rgba(22, 129, 24, 0.8)'),
                                                        children: isCalculating ? 'Calculating...' : 'Check Current RTP'
                                                    }, void 0, false, {
                                                        fileName: "[project]/App.tsx",
                                                        lineNumber: 643,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: calibrateFromActualData,
                                                        disabled: totalGamesPlayedRef.current - lastCalibrationGamesRef.current < 50,
                                                        className: "w-full text-white px-4 py-2 rounded transition-colors disabled:bg-gray-600 disabled:text-gray-400",
                                                        style: {
                                                            backgroundColor: totalGamesPlayedRef.current - lastCalibrationGamesRef.current >= 50 ? 'rgba(139, 69, 19, 0.8)' : 'rgba(75, 75, 75, 0.8)'
                                                        },
                                                        onMouseEnter: (e)=>totalGamesPlayedRef.current - lastCalibrationGamesRef.current >= 50 && !isCalculating && (e.currentTarget.style.backgroundColor = 'rgba(139, 69, 19, 1)'),
                                                        onMouseLeave: (e)=>totalGamesPlayedRef.current - lastCalibrationGamesRef.current >= 50 && (e.currentTarget.style.backgroundColor = 'rgba(139, 69, 19, 0.8)'),
                                                        children: totalGamesPlayedRef.current - lastCalibrationGamesRef.current >= 50 ? `Calibrate (${totalGamesPlayedRef.current - lastCalibrationGamesRef.current} new games, ${totalGamesPlayedRef.current} total)` : `Need 50+ new games (${totalGamesPlayedRef.current - lastCalibrationGamesRef.current} new, ${totalGamesPlayedRef.current} total)`
                                                    }, void 0, false, {
                                                        fileName: "[project]/App.tsx",
                                                        lineNumber: 646,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: forceCalibrate,
                                                        disabled: totalGamesPlayedRef.current < 50,
                                                        className: "w-full text-white px-4 py-2 rounded transition-colors mt-2 disabled:bg-gray-600 disabled:text-gray-400",
                                                        style: {
                                                            backgroundColor: totalGamesPlayedRef.current >= 50 ? 'rgba(220, 38, 38, 0.8)' : 'rgba(75, 75, 75, 0.8)'
                                                        },
                                                        onMouseEnter: (e)=>totalGamesPlayedRef.current >= 50 && (e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 1)'),
                                                        onMouseLeave: (e)=>totalGamesPlayedRef.current >= 50 && (e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.8)'),
                                                        children: "⚡ Force Calibrate (Full Adjustment to 95%)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/App.tsx",
                                                        lineNumber: 658,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: exportCalibratedMultipliers,
                                                        className: "w-full text-white px-4 py-2 rounded transition-colors mt-2",
                                                        style: {
                                                            backgroundColor: 'rgba(59, 130, 246, 0.8)'
                                                        },
                                                        onMouseEnter: (e)=>e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 1)',
                                                        onMouseLeave: (e)=>e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.8)',
                                                        children: "📋 Save Calibrated Multipliers to constants.ts"
                                                    }, void 0, false, {
                                                        fileName: "[project]/App.tsx",
                                                        lineNumber: 668,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CALIBRATED_MULTIPLIERS"].length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 p-2 bg-green-900/30 border border-green-700/50 rounded text-xs text-green-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "✅ Pre-calibrated:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/App.tsx",
                                                                lineNumber: 679,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            " Using calibrated multipliers from constants.ts. Game is ready to ship!"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/App.tsx",
                                                        lineNumber: 678,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    totalGamesPlayedRef.current >= 50 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 p-2 bg-blue-900/30 border border-blue-700/50 rounded text-xs text-blue-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: "💡 Dev Calibration:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/App.tsx",
                                                                lineNumber: 684,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            ' Play 200+ games, calibrate until RTP is ~95%, then click "Save Calibrated Multipliers" to export. The game will ship pre-calibrated!'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/App.tsx",
                                                        lineNumber: 683,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/App.tsx",
                                                lineNumber: 638,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            simulationResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-gray-900 p-3 rounded mt-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                    className: "text-xs text-white whitespace-pre-wrap font-mono",
                                                    children: simulationResult
                                                }, void 0, false, {
                                                    fileName: "[project]/App.tsx",
                                                    lineNumber: 690,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/App.tsx",
                                                lineNumber: 689,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 625,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    devToolsTab === 'balance' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-gray-400",
                                                children: "Current Balance"
                                            }, void 0, false, {
                                                fileName: "[project]/App.tsx",
                                                lineNumber: 697,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                                lineNumber: 698,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 696,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    devToolsTab === 'history' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$HistoryTable$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        history: history,
                                        totalGames: totalGamesPlayedRef.current,
                                        totalPayout: totalPayoutRef.current
                                    }, void 0, false, {
                                        fileName: "[project]/App.tsx",
                                        lineNumber: 702,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/App.tsx",
                                lineNumber: 622,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/App.tsx",
                        lineNumber: 610,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/App.tsx",
                    lineNumber: 609,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/App.tsx",
            lineNumber: 522,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/App.tsx",
        lineNumber: 521,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = App;
}),
];

//# sourceMappingURL=_3fb0321f._.js.map