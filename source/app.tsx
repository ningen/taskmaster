import React, {useState} from 'react';
import {useInput} from 'ink';
import {useApp} from './context/AppContext.js';
import {AppProvider} from './context/AppContext.js';
import Layout from './components/Layout.js';
import Dashboard from './screens/Dashboard.js';
import Tasks from './screens/Tasks.js';
import Settings from './screens/Settings.js';
import Gantt from './screens/Gantt.js';
import NewTaskInput from './components/NewTaskInput.js';
import {generateId} from './utils/storage.js';

function AppContent() {
	const {state, dispatch} = useApp();
	const [showNewTaskInput, setShowNewTaskInput] = useState(false);

	useInput((input: string) => {
		if (input === 'q') {
			process.exit(0);
		}

		if (input === 'd') {
			dispatch({type: 'SET_SCREEN', payload: 'dashboard'});
		}

		if (input === 't') {
			dispatch({type: 'SET_SCREEN', payload: 'tasks'});
		}

		if (input === 's') {
			dispatch({type: 'SET_SCREEN', payload: 'settings'});
		}

		if (input === 'g') {
			dispatch({type: 'SET_SCREEN', payload: 'gantt'});
		}

		if (input === 'n' && !showNewTaskInput) {
			setShowNewTaskInput(true);
		}
	});

	const renderScreen = () => {
		switch (state.currentScreen) {
			case 'dashboard':
				return <Dashboard />;
			case 'tasks':
				return <Tasks />;
			case 'settings':
				return <Settings />;
			case 'gantt':
				return <Gantt />;
			default:
				return <Dashboard />;
		}
	};

	const handleTaskCreated = (title: string, description: string, estimatedHours?: number, startDate?: Date, endDate?: Date) => {
		const now = new Date();
		const newTask = {
			id: generateId(),
			title,
			description,
			completed: false,
			priority: 'medium' as const,
			createdAt: now,
			updatedAt: now,
			category: 'Personal',
			status: '作成' as const,
			statusHistory: [
				{
					status: '作成' as const,
					timestamp: now,
				},
			],
			estimatedHours,
			startDate,
			endDate,
		};
		dispatch({type: 'ADD_TASK', payload: newTask});
		setShowNewTaskInput(false);
	};

	const handleTaskCancelled = () => {
		setShowNewTaskInput(false);
	};

	if (showNewTaskInput) {
		return (
			<Layout>
				<NewTaskInput
					onTaskCreated={handleTaskCreated}
					onCancel={handleTaskCancelled}
				/>
			</Layout>
		);
	}

	return <Layout>{renderScreen()}</Layout>;
}

export default function App() {
	return (
		<AppProvider>
			<AppContent />
		</AppProvider>
	);
}
