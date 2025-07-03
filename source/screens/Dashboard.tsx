import React from 'react';
import {Box, Text} from 'ink';
import {useApp} from '../context/AppContext.js';
import {format} from 'date-fns';

export default function Dashboard() {
	const {state} = useApp();
	const {tasks, theme} = state;

	const totalTasks = tasks.length;
	const completedTasks = tasks.filter(task => task.completed).length;
	const pendingTasks = totalTasks - completedTasks;
	const highPriorityTasks = tasks.filter(
		task => task.priority === 'high' && !task.completed,
	).length;
	const todayTasks = tasks.filter(task => {
		if (!task.dueDate) return false;
		const today = new Date();
		return (
			task.dueDate.toDateString() === today.toDateString() && !task.completed
		);
	}).length;

	const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

	const recentTasks = tasks
		.filter(task => !task.completed)
		.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
		.slice(0, 5);

	return (
		<Box flexDirection="column" gap={1}>
			<Text color={theme.accent} bold>
				📊 Dashboard
			</Text>

			{/* Stats Grid */}
			<Box gap={2}>
				<Box flexDirection="column" borderStyle="single" padding={1} width={20}>
					<Text color={theme.secondary}>Total Tasks</Text>
					<Text color={theme.accent} bold>
						{totalTasks}
					</Text>
				</Box>

				<Box flexDirection="column" borderStyle="single" padding={1} width={20}>
					<Text color={theme.secondary}>Completed</Text>
					<Text color={theme.success} bold>
						{completedTasks}
					</Text>
				</Box>

				<Box flexDirection="column" borderStyle="single" padding={1} width={20}>
					<Text color={theme.secondary}>Pending</Text>
					<Text color={theme.warning} bold>
						{pendingTasks}
					</Text>
				</Box>

				<Box flexDirection="column" borderStyle="single" padding={1} width={20}>
					<Text color={theme.secondary}>High Priority</Text>
					<Text color={theme.error} bold>
						{highPriorityTasks}
					</Text>
				</Box>
			</Box>

			{/* Progress Bar */}
			<Box flexDirection="column" gap={1}>
				<Text color={theme.text}>
					Completion Rate: {completionRate.toFixed(1)}%
				</Text>
				<Box width={50} borderStyle="single">
					<Text color={theme.success}>
						{'\u2588'.repeat(Math.floor((completionRate / 100) * 48))}
					</Text>
				</Box>
			</Box>

			{/* Recent Tasks */}
			<Box flexDirection="column" gap={1}>
				<Text color={theme.accent} bold>
					📋 Recent Tasks
				</Text>
				{recentTasks.length === 0 ? (
					<Text color={theme.secondary}>No pending tasks</Text>
				) : (
					recentTasks.map(task => (
						<Box key={task.id} gap={1}>
							<Text
								color={
									task.priority === 'high'
										? theme.error
										: task.priority === 'medium'
										? theme.warning
										: theme.secondary
								}
							>
								{task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'}
							</Text>
							<Text color={theme.text}>{task.title}</Text>
							<Text color={theme.secondary}>
								{format(task.createdAt, 'MMM dd')}
							</Text>
						</Box>
					))
				)}
			</Box>

			{/* Today's Tasks */}
			{todayTasks > 0 && (
				<Box flexDirection="column" gap={1}>
					<Text color={theme.warning} bold>
						⚠️ Due Today: {todayTasks} tasks
					</Text>
				</Box>
			)}
		</Box>
	);
}