import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';
import {useApp, getValidNextStatuses} from '../context/AppContext.js';
import {format} from 'date-fns';
import WorkflowHistory from '../components/WorkflowHistory.js';

export default function Tasks() {
	const {state, dispatch} = useApp();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedCategory, setSelectedCategory] = useState<string>('All');

	const filteredTasks = state.tasks.filter(task => {
		if (selectedCategory === 'All') return true;
		if (selectedCategory === 'Today') {
			if (!task.dueDate) return false;
			const today = new Date();
			return task.dueDate.toDateString() === today.toDateString();
		}
		if (selectedCategory === 'Completed') return task.completed;
		if (selectedCategory === 'Pending') return !task.completed;
		return task.category === selectedCategory;
	});

	const categories = [
		'All',
		'Today',
		'Completed',
		'Pending',
		...state.categories,
	];

	useInput((input, key) => {
		if (key.upArrow && selectedIndex > 0) {
			setSelectedIndex(selectedIndex - 1);
		} else if (key.downArrow && selectedIndex < filteredTasks.length - 1) {
			setSelectedIndex(selectedIndex + 1);
		} else if (key.leftArrow) {
			const currentCatIndex = categories.indexOf(selectedCategory);
			const prevIndex = currentCatIndex > 0 ? currentCatIndex - 1 : 0;
			const prevCategory = categories[prevIndex];
			if (prevCategory) {
				setSelectedCategory(prevCategory);
				setSelectedIndex(0);
			}
		} else if (key.rightArrow) {
			const currentCatIndex = categories.indexOf(selectedCategory);
			const nextIndex =
				currentCatIndex < categories.length - 1 ? currentCatIndex + 1 : currentCatIndex;
			const nextCategory = categories[nextIndex];
			if (nextCategory) {
				setSelectedCategory(nextCategory);
				setSelectedIndex(0);
			}
		} else if (input === ' ') {
			const selectedTask = filteredTasks[selectedIndex];
			if (selectedTask) {
				const validNextStatuses = getValidNextStatuses(selectedTask.status);
				if (validNextStatuses.length > 0 && validNextStatuses[0]) {
					dispatch({
						type: 'CHANGE_TASK_STATUS',
						payload: {
							taskId: selectedTask.id,
							newStatus: validNextStatuses[0],
						},
					});
				}
			}
		}
	});

	const getTaskStats = (category: string) => {
		let count = 0;
		if (category === 'All') count = state.tasks.length;
		else if (category === 'Today') {
			count = state.tasks.filter(task => {
				if (!task.dueDate) return false;
				const today = new Date();
				return task.dueDate.toDateString() === today.toDateString();
			}).length;
		} else if (category === 'Completed') {
			count = state.tasks.filter(task => task.completed).length;
		} else if (category === 'Pending') {
			count = state.tasks.filter(task => !task.completed).length;
		} else {
			count = state.tasks.filter(task => task.category === category).length;
		}
		return count;
	};

	return (
		<Box flexDirection="row" height="100%">
			{/* Sidebar */}
			<Box
				flexDirection="column"
				borderStyle="single"
				borderRight={true}
				borderTop={false}
				borderBottom={false}
				borderLeft={false}
				borderColor={state.theme.primary}
				width={20}
				paddingX={1}
			>
				<Text color={state.theme.accent} bold>
					Categories
				</Text>
				{categories.map(category => (
					<Box key={category} justifyContent="space-between">
						<Text
							color={
								selectedCategory === category
									? state.theme.accent
									: state.theme.text
							}
							bold={selectedCategory === category}
						>
							{selectedCategory === category ? '▶ ' : '  '}
							{category}
						</Text>
						<Text color={state.theme.secondary}>
							({getTaskStats(category)})
						</Text>
					</Box>
				))}
			</Box>

			{/* Task List */}
			<Box flexDirection="column" flexGrow={1} paddingX={1}>
				<Text color={state.theme.accent} bold>
					📋 Tasks - {selectedCategory}
				</Text>
				{filteredTasks.length === 0 ? (
					<Text color={state.theme.secondary}>No tasks found</Text>
				) : (
					filteredTasks.map((task, index) => (
						<Box
							key={task.id}
							paddingX={1}
						>
							<Text
								color={
									selectedIndex === index
										? state.theme.accent
										: task.completed
										? state.theme.success
										: state.theme.text
								}
								strikethrough={task.completed}
							>
								{task.completed ? '✓' : '○'} {task.title} [{task.status}]
							</Text>
							<Text
								color={
									selectedIndex === index
										? state.theme.accent
										: task.priority === 'high'
										? state.theme.error
										: task.priority === 'medium'
										? state.theme.warning
										: state.theme.secondary
								}
							>
								{task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'}
							</Text>
							{task.dueDate && (
								<Text
									color={
										selectedIndex === index
											? state.theme.accent
											: state.theme.secondary
									}
								>
									{format(task.dueDate, 'MMM dd')}
								</Text>
							)}
						</Box>
					))
				)}
				<Box marginTop={1}>
					<Text color={state.theme.secondary}>
						Use ↑↓ to navigate, ←→ to change category, SPACE to advance workflow
					</Text>
				</Box>
				{filteredTasks.length > 0 && filteredTasks[selectedIndex] && (
					<WorkflowHistory
						task={filteredTasks[selectedIndex]}
						themeColor={state.theme.accent}
					/>
				)}
			</Box>
		</Box>
	);
}