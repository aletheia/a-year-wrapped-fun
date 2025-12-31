# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Luca's 2025 Wrapped" - a satirical year-in-review infographic web app styled like Spotify Wrapped, with tech/startup humor. It presents life metrics (sleep, breathing, hydration, meetings, etc.) in a fun, animated slideshow format.

## Project Structure

```
wrapped/
├── index.html          # Vite entry point
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── src/
    ├── main.jsx        # React entry point
    ├── index.css       # Global styles
    └── components/
        ├── WrapUp2025.jsx   # Main React component
        └── WrapUp2025.css   # Component styles
```

## Running the App

```bash
# Install dependencies
npm install

# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

The app is a React-based single-page slideshow with:
- 10 full-screen slides navigable via arrow buttons or dot navigation
- CSS animations triggered on slide transitions
- Animated counters using React state and intervals
- Circular progress components with SVG
- Bar charts and funnel visualizations

### Key Design Patterns

- All content in Italian
- Neo-brutalist tech aesthetic with dark mode and neon accents
- Font stack: Space Mono (monospace) + Syne (display) via Google Fonts
- CSS animations for slide transitions and visual effects

## Content Source

Original content is in `~/Downloads/wrapped.md` - maintain fidelity to those texts when making updates.
