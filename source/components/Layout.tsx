import React from 'react';
import {Box, Text, useInput} from 'ink';
import {useApp} from '../context/AppContext.js';
import {format} from 'date-fns';

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({children}: LayoutProps) {
	const {state, dispatch} = useApp();
	const currentTime = format(new Date(), 'HH:mm');
	const taskCount = state.tasks.length;
	const completedCount = state.tasks.filter(task => task.completed).length;

	useInput((_input: string, key) => {
		if (key.tab) {
			const screens = ['dashboard', 'tasks', 'settings', 'gantt'] as const;
			const currentIndex = screens.indexOf(state.currentScreen);
			const nextIndex = (currentIndex + 1) % screens.length;
			const nextScreen = screens[nextIndex];
			if (nextScreen) {
				dispatch({type: 'SET_SCREEN', payload: nextScreen});
			}
		}
	});

	return (
		<Box flexDirection="column" height="100%">
			{/* Header */}
			<Box
				borderStyle="single"
				borderColor={state.theme.primary}
				paddingX={1}
				justifyContent="space-between"
			>
				<Text color={state.theme.accent} bold>
					TaskMaster v1.0
				</Text>
				<Text color={state.theme.secondary}>
					{currentTime} | {completedCount}/{taskCount} tasks
				</Text>
			</Box>

			{/* Navigation */}
			<Box
				borderStyle="single"
				borderTop={false}
				borderColor={state.theme.primary}
				paddingX={1}
			>
				<Box gap={1}>
					<Text
						color={
							state.currentScreen === 'dashboard'
								? state.theme.accent
								: state.theme.text
						}
						bold={state.currentScreen === 'dashboard'}
					>
						[D]ashboard
					</Text>
					<Text
						color={
							state.currentScreen === 'tasks'
								? state.theme.accent
								: state.theme.text
						}
						bold={state.currentScreen === 'tasks'}
					>
						[T]asks
					</Text>
					<Text
						color={
							state.currentScreen === 'settings'
								? state.theme.accent
								: state.theme.text
						}
						bold={state.currentScreen === 'settings'}
					>
						[S]ettings
					</Text>
					<Text
						color={
							state.currentScreen === 'gantt'
								? state.theme.accent
								: state.theme.text
						}
						bold={state.currentScreen === 'gantt'}
					>
						[G]antt
					</Text>
				</Box>
			</Box>

			{/* Main Content */}
			<Box flexGrow={1} padding={1}>
				{children}
			</Box>

			{/* Footer */}
			<Box
				borderStyle="single"
				borderBottom={false}
				borderColor={state.theme.primary}
				paddingX={1}
			>
				<Text color={state.theme.secondary}>
					[q]uit [n]ew [d]ash [t]ask [s]ettings [g]antt [tab]switch
				</Text>
			</Box>
		</Box>
	);
}