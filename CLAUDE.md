# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Watch TypeScript compilation during development
- `npm run build` - Build the project (compiles TypeScript to dist/)
- `npm run run` - Build and run the CLI application

### Testing and Quality
- `npm test` - Run full test suite (prettier, xo linting, and ava tests)
- `npm run test` - Same as above (runs prettier --check, xo, and ava)

### Running the CLI
- `node dist/cli.js` - Run the built CLI directly
- `node dist/cli.js --name=YourName` - Run with name parameter

## Architecture

This is an Ink-based CLI application built with React and TypeScript:

### Core Structure
- **Entry Point**: `source/cli.tsx` - CLI setup using meow for argument parsing and renders the main App component
- **Main Component**: `source/app.tsx` - Simple React component that displays a greeting message
- **Build Output**: `dist/` - Compiled JavaScript output from TypeScript source

### Key Technologies
- **Ink**: React-based CLI framework for building command-line interfaces
- **TypeScript**: Source files in `source/` directory, compiled to `dist/`
- **Testing**: AVA test runner with ink-testing-library for component testing
- **Linting**: XO with React extensions and Prettier for code formatting

### Testing Architecture
- Tests are in `test.tsx` at the root level
- Uses ink-testing-library for rendering React components in tests
- Tests verify both default behavior (greeting "Stranger") and parameterized behavior

### Configuration
- TypeScript config extends `@sindresorhus/tsconfig` with output to `dist/`
- XO linting configured with React extensions and Prettier integration
- AVA configured to handle TypeScript and TSX files with ts-node loader