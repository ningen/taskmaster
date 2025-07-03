import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';
import {useApp} from '../context/AppContext.js';
import {format, differenceInDays, startOfWeek, endOfWeek} from 'date-fns';

export default function Gantt() {
	const {state} = useApp();
	const tasksWithDates = state.tasks.filter(task => task.startDate && task.endDate);
	const [scrollOffset, setScrollOffset] = useState(0);
	const viewportWidth = 50;

	useInput((_input, key) => {
		if (key.leftArrow) {
			setScrollOffset(prev => Math.max(0, prev - 5));
		} else if (key.rightArrow) {
			setScrollOffset(prev => prev + 5);
		}
	});

	if (tasksWithDates.length === 0) {
		return (
			<Box flexDirection="column" padding={1}>
				<Box marginBottom={1}>
					<Text bold color="cyan">📊 ガントチャート</Text>
				</Box>
				<Box marginBottom={1}>
					<Text color="yellow">開始日と終了日が設定されたタスクがありません。</Text>
				</Box>
				<Box marginBottom={1}>
					<Text color="gray">タスクを作成する際に開始日と終了日を設定してください。</Text>
				</Box>
			</Box>
		);
	}

	const allDates = tasksWithDates.flatMap(task => [task.startDate!, task.endDate!]);
	const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
	const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));
	
	const weekStart = startOfWeek(minDate, {weekStartsOn: 1});
	const weekEnd = endOfWeek(maxDate, {weekStartsOn: 1});
	const totalDays = differenceInDays(weekEnd, weekStart) + 1;

	const renderTaskBar = (task: any) => {
		const taskStart = differenceInDays(task.startDate, weekStart);
		const taskDuration = differenceInDays(task.endDate, task.startDate) + 1;
		const taskEnd = taskStart + taskDuration;

		let bar = '';
		for (let i = scrollOffset; i < Math.min(totalDays, scrollOffset + viewportWidth); i++) {
			if (i >= taskStart && i < taskEnd) {
				bar += task.status === '終了' ? '█' : '▓';
			} else {
				bar += ' ';
			}
		}
		return bar;
	};

	const renderTimeline = () => {
		let timeline = '';
		for (let i = scrollOffset; i < Math.min(totalDays, scrollOffset + viewportWidth); i++) {
			const currentDate = new Date(weekStart);
			currentDate.setDate(weekStart.getDate() + i);
			if (currentDate.getDay() === 1) {
				timeline += '|';
			} else {
				timeline += '-';
			}
		}
		return timeline;
	};

	const renderDateLabels = () => {
		const labels = [];
		for (let i = scrollOffset; i < Math.min(totalDays, scrollOffset + viewportWidth); i += 7) {
			if (i >= scrollOffset) {
				const currentDate = new Date(weekStart);
				currentDate.setDate(weekStart.getDate() + i);
				labels.push(format(currentDate, 'MM/dd'));
			}
		}
		return labels;
	};

	return (
		<Box flexDirection="column" padding={1}>
			<Box marginBottom={1}>
				<Text bold color="cyan">📊 ガントチャート</Text>
			</Box>
			
			<Box marginBottom={1}>
				<Text color="gray">期間: {format(minDate, 'yyyy/MM/dd')} - {format(maxDate, 'yyyy/MM/dd')}</Text>
			</Box>

			<Box flexDirection="column" marginBottom={1}>
				<Box marginBottom={1}>
					<Text color="yellow">日付</Text>
				</Box>
				<Box>
					<Box width={20}></Box>
					<Text color="gray">{renderDateLabels().join('     ')}</Text>
				</Box>
				<Box>
					<Box width={20}></Box>
					<Text color="gray">{renderTimeline()}</Text>
				</Box>
			</Box>

			{tasksWithDates.map((task) => (
				<Box key={task.id} marginBottom={1}>
					<Box width={18} marginRight={2}>
						<Text color={task.status === '終了' ? 'green' : 'yellow'} wrap="truncate">
							{task.title}
						</Text>
					</Box>
					<Box>
						<Text color={task.status === '終了' ? 'green' : 'cyan'}>
							{renderTaskBar(task)}
						</Text>
					</Box>
					<Box marginLeft={2}>
						<Text color="gray">
							{task.estimatedHours ? `${task.estimatedHours}h` : ''}
						</Text>
					</Box>
				</Box>
			))}

			<Box marginTop={1}>
				<Text color="gray">
					凡例: █ = 完了, ▓ = 進行中/未完了
				</Text>
			</Box>
			
			{totalDays > viewportWidth && (
				<Box marginTop={1}>
					<Text color="blue">
						← → キーでスクロール ({scrollOffset + 1}-{Math.min(totalDays, scrollOffset + viewportWidth)} / {totalDays}日)
					</Text>
				</Box>
			)}
		</Box>
	);
}