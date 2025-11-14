# Plinky - Plinko Game

A physics-based Plinko gambling game built with React, Next.js, and Matter.js. Features real-time physics simulation, RTP calibration tools, and responsive design that maintains consistent physics across all screen sizes.

## Features

- 🎯 **Real-time Physics Simulation** - Powered by Matter.js for accurate ball physics
- 📊 **RTP Calibration** - Built-in dev tools for calibrating Return to Player (RTP) to target 95%
- 📱 **Responsive Design** - Continuously variable physics that adapts to any screen size
- 🎮 **Farcaster Mini App** - Compatible with Farcaster Mini App SDK
- 🔊 **Sound Effects** - Audio feedback for peg collisions
- 📈 **Game History** - Track all games with payout history

## Run Locally

**Prerequisites:** Node.js (v18 or higher)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js** - React framework
- **Matter.js** - Physics engine
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Farcaster Mini App SDK** - Mini app integration

## Physics Calibration

The game includes dev tools for calibrating multipliers to achieve a target RTP of 95%. Physics are normalized to maintain consistent behavior across all screen sizes, ensuring fair gameplay regardless of device dimensions.
