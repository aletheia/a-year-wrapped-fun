# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Luca's 2025 Wrapped" - a satirical year-in-review infographic web app styled like Spotify Wrapped, with tech/startup humor. It presents life metrics (sleep, breathing, hydration, meetings, etc.) in a fun, animated slideshow format.

## Project Structure

- `index.html` - **Production version**: Standalone HTML file with embedded CSS and JavaScript. No build step required. Open directly in browser.
- `wrap-up-2025.jsx` - React component version (requires React environment to run)

## Running the App

```bash
# Simply open the HTML file in a browser
open index.html
```

## Architecture

The app is a single-page slideshow with:
- 10 full-screen slides navigable via scroll, swipe, keyboard (↑↓), or dot navigation
- CSS animations triggered on slide activation via `.active` class
- Animated counters using `requestAnimationFrame`
- Progress bars with CSS transitions
- Particle effects generated via JavaScript

### Key Design Patterns

- All content in Italian
- Neo-brutalist tech aesthetic with dark mode and neon accents
- Font stack: JetBrains Mono (monospace) + Outfit (display)
- CSS custom properties for consistent theming (`--accent-cyan`, `--accent-magenta`, etc.)

## Content Source

Original content is in `~/Downloads/wrapped.md` - maintain fidelity to those texts when making updates.
