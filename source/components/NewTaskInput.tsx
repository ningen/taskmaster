import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';
import TextInput from 'ink-text-input';

interface NewTaskInputProps {
	onTaskCreated: (title: string, description: string, estimatedHours?: number, startDate?: Date, endDate?: Date) => void;
	onCancel: () => void;
}

export default function NewTaskInput({onTaskCreated, onCancel}: NewTaskInputProps) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [estimatedHours, setEstimatedHours] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [currentField, setCurrentField] = useState<'title' | 'description' | 'estimatedHours' | 'startDate' | 'endDate'>('title');

	useInput((_input, key) => {
		if (key.escape) {
			onCancel();
		}

		if (key.return) {
			const fields = ['title', 'description', 'estimatedHours', 'startDate', 'endDate'] as const;
			const currentIndex = fields.indexOf(currentField);
			
			if (currentIndex < fields.length - 1) {
				if (currentField === 'title' && title.trim()) {
					setCurrentField(fields[currentIndex + 1] as typeof currentField);
				} else if (currentField !== 'title') {
					setCurrentField(fields[currentIndex + 1] as typeof currentField);
				}
			} else if (title.trim()) {
				const parsedEstimatedHours = estimatedHours ? parseFloat(estimatedHours) : undefined;
				const parsedStartDate = startDate ? new Date(startDate) : undefined;
				const parsedEndDate = endDate ? new Date(endDate) : undefined;
				onTaskCreated(title.trim(), description.trim(), parsedEstimatedHours, parsedStartDate, parsedEndDate);
			}
		}

		if (key.tab) {
			const fields = ['title', 'description', 'estimatedHours', 'startDate', 'endDate'] as const;
			const currentIndex = fields.indexOf(currentField);
			const nextIndex = (currentIndex + 1) % fields.length;
			setCurrentField(fields[nextIndex] as typeof currentField);
		}
	}, {isActive: true});

	return (
		<Box flexDirection="column" padding={1}>
			<Box marginBottom={1}>
				<Text bold color="cyan">新しいタスクを作成</Text>
			</Box>
			
			<Box flexDirection="column" marginBottom={1}>
				<Box marginBottom={1}>
					<Text color={currentField === 'title' ? 'yellow' : 'gray'}>
						タスク名: 
					</Text>
				</Box>
				<Box marginLeft={2}>
					<TextInput
						value={title}
						onChange={setTitle}
						placeholder="タスク名を入力してください"
						focus={currentField === 'title'}
					/>
				</Box>
			</Box>

			<Box flexDirection="column" marginBottom={1}>
				<Box marginBottom={1}>
					<Text color={currentField === 'description' ? 'yellow' : 'gray'}>
						説明: 
					</Text>
				</Box>
				<Box marginLeft={2}>
					<TextInput
						value={description}
						onChange={setDescription}
						placeholder="説明を入力してください（オプション）"
						focus={currentField === 'description'}
					/>
				</Box>
			</Box>

			<Box flexDirection="column" marginBottom={1}>
				<Box marginBottom={1}>
					<Text color={currentField === 'estimatedHours' ? 'yellow' : 'gray'}>
						見積時間 (時間): 
					</Text>
				</Box>
				<Box marginLeft={2}>
					<TextInput
						value={estimatedHours}
						onChange={setEstimatedHours}
						placeholder="見積時間を入力してください（オプション）"
						focus={currentField === 'estimatedHours'}
					/>
				</Box>
			</Box>

			<Box flexDirection="column" marginBottom={1}>
				<Box marginBottom={1}>
					<Text color={currentField === 'startDate' ? 'yellow' : 'gray'}>
						開始日 (YYYY-MM-DD): 
					</Text>
				</Box>
				<Box marginLeft={2}>
					<TextInput
						value={startDate}
						onChange={setStartDate}
						placeholder="開始日を入力してください（オプション）"
						focus={currentField === 'startDate'}
					/>
				</Box>
			</Box>

			<Box flexDirection="column" marginBottom={1}>
				<Box marginBottom={1}>
					<Text color={currentField === 'endDate' ? 'yellow' : 'gray'}>
						終了日 (YYYY-MM-DD): 
					</Text>
				</Box>
				<Box marginLeft={2}>
					<TextInput
						value={endDate}
						onChange={setEndDate}
						placeholder="終了日を入力してください（オプション）"
						focus={currentField === 'endDate'}
					/>
				</Box>
			</Box>

			<Box marginTop={1}>
				<Text color="gray">
					操作: Enter=次へ/作成 | Tab=フィールド切替 | Esc=キャンセル
				</Text>
			</Box>
		</Box>
	);
}