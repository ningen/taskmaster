import React from 'react';
import {Box, Text} from 'ink';
import {format, parseISO} from 'date-fns';
import {Task} from '../types.js';

interface WorkflowHistoryProps {
	task: Task;
	themeColor: string;
}

export default function WorkflowHistory({task, themeColor}: WorkflowHistoryProps) {
	return (
		<Box flexDirection="column" paddingX={1}>
			<Text color={themeColor} bold>
				Workflow History
			</Text>
			{task.statusHistory?.map((entry, index) => (
				<Box key={index} marginTop={index > 0 ? 1 : 0}>
					<Text>
						{entry.status} - {format(typeof entry.timestamp === 'string' ? parseISO(entry.timestamp) : entry.timestamp, 'MMM dd, yyyy HH:mm')}
					</Text>
				</Box>
			))}
		</Box>
	);
}