# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Watch TypeScript compilation during development
- `npm run build` - Build the project (compiles TypeScript to dist/)
- `npm run start` - Build and run the CLI application
- `npm run run` - Build and run the CLI application

### Testing and Quality
- `npm test` - Run full test suite (prettier, xo linting, and ava tests)

### Running the CLI
- `node dist/cli.js` - Run the built CLI directly

## Architecture

This is a TaskMaster TUI (Text User Interface) application built with React, Ink, and TypeScript for terminal-based task management.

### Core Structure
- **Entry Point**: `source/cli.tsx` - CLI setup using meow for argument parsing and renders the main App component
- **Main App**: `source/app.tsx` - Main application component with screen routing and keyboard shortcuts
- **Build Output**: `dist/` - Compiled JavaScript output from TypeScript source

### Key Components
- **State Management**: `source/context/AppContext.tsx` - React Context with useReducer for global state
- **Storage**: `source/utils/storage.ts` - File-based persistence to `~/.taskmaster/tasks.json`
- **Types**: `source/types.ts` - TypeScript definitions for Task, AppState, and Actions

### Screen Navigation
- **Dashboard**: `source/screens/Dashboard.tsx` - Main overview screen
- **Tasks**: `source/screens/Tasks.tsx` - Task list and management
- **Settings**: `source/screens/Settings.tsx` - Application settings
- **Gantt**: `source/screens/Gantt.tsx` - Gantt chart view for project planning

### Task Management Features
- **Status Workflow**: Tasks follow a Japanese status system: '作成' (Create) → '見積' (Estimate) → '開始' (Start) → '終了' (Complete)
- **Categories**: Personal, Work, Projects, Shopping
- **Priorities**: low, medium, high
- **Scheduling**: Support for estimated hours, start/end dates

### Key Technologies
- **Ink**: React-based CLI framework for building terminal interfaces
- **TypeScript**: Source files in `source/` directory, compiled to `dist/`
- **Testing**: AVA test runner with ink-testing-library for component testing
- **Linting**: XO with React extensions and Prettier for code formatting
- **File System**: fs-extra for enhanced file operations

### Configuration
- TypeScript config extends `@sindresorhus/tsconfig` with output to `dist/`
- XO linting configured with React extensions and Prettier integration
- AVA configured to handle TypeScript and TSX files with ts-node loader