#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

meow(
	`
	Usage
	  $ taskmaster-tui

	Options
		--help     Show help
		--version  Show version

	Examples
	  $ taskmaster-tui
	  Starts the TaskMaster TUI application
`,
	{
		importMeta: import.meta,
		flags: {},
	},
);

render(<App />);
