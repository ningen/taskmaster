import React from 'react';
import {Box, Text} from 'ink';
import {useApp} from '../context/AppContext.js';

export default function Settings() {
	const {state} = useApp();

	return (
		<Box flexDirection="column" gap={1}>
			<Text color={state.theme.accent} bold>
				⚙️ Settings
			</Text>

			<Box flexDirection="column" gap={1}>
				<Text color={state.theme.text} bold>
					Application Info
				</Text>
				<Text color={state.theme.secondary}>
					Version: 1.0.0
				</Text>
				<Text color={state.theme.secondary}>
					Data Directory: ~/.taskmaster/
				</Text>
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text color={state.theme.text} bold>
					Statistics
				</Text>
				<Text color={state.theme.secondary}>
					Total Tasks: {state.tasks.length}
				</Text>
				<Text color={state.theme.secondary}>
					Completed Tasks: {state.tasks.filter(task => task.completed).length}
				</Text>
				<Text color={state.theme.secondary}>
					Categories: {state.categories.length}
				</Text>
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text color={state.theme.text} bold>
					Theme
				</Text>
				<Text color={state.theme.secondary}>
					Current Theme: Dark
				</Text>
			</Box>

			<Box flexDirection="column" gap={1}>
				<Text color={state.theme.text} bold>
					Keyboard Shortcuts
				</Text>
				<Text color={state.theme.secondary}>
					Tab: Switch screens
				</Text>
				<Text color={state.theme.secondary}>
					↑↓: Navigate items
				</Text>
				<Text color={state.theme.secondary}>
					←→: Change category (Tasks screen)
				</Text>
				<Text color={state.theme.secondary}>
					Space: Toggle task completion
				</Text>
				<Text color={state.theme.secondary}>
					n: New task
				</Text>
				<Text color={state.theme.secondary}>
					e: Edit task
				</Text>
				<Text color={state.theme.secondary}>
					d: Delete task
				</Text>
				<Text color={state.theme.secondary}>
					q: Quit application
				</Text>
			</Box>
		</Box>
	);
}