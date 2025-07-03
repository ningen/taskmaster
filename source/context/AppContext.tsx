import React, {createContext, useContext, useReducer, useEffect} from 'react';
import {AppState, Action, Theme, TaskStatus} from '../types.js';
import {loadTasks, saveTasks} from '../utils/storage.js';

const defaultTheme: Theme = {
	primary: '#3b82f6',
	secondary: '#6b7280',
	accent: '#10b981',
	background: '#1f2937',
	text: '#f3f4f6',
	success: '#10b981',
	warning: '#f59e0b',
	error: '#ef4444',
};

const initialState: AppState = {
	tasks: [],
	currentScreen: 'dashboard',
	selectedTaskId: undefined,
	showModal: false,
	modalType: undefined,
	theme: defaultTheme,
	categories: ['Personal', 'Work', 'Projects', 'Shopping'],
	filter: {},
};

const getValidNextStatuses = (currentStatus: TaskStatus): TaskStatus[] => {
	switch (currentStatus) {
		case '作成':
			return ['見積'];
		case '見積':
			return ['開始'];
		case '開始':
			return ['終了'];
		case '終了':
			return [];
		default:
			return [];
	}
};

const canTransitionTo = (currentStatus: TaskStatus, newStatus: TaskStatus): boolean => {
	const validNextStatuses = getValidNextStatuses(currentStatus);
	return validNextStatuses.includes(newStatus);
};

function appReducer(state: AppState, action: Action): AppState {
	switch (action.type) {
		case 'SET_SCREEN':
			return {...state, currentScreen: action.payload};
		case 'SET_TASKS':
			return {...state, tasks: action.payload};
		case 'ADD_TASK':
			return {...state, tasks: [...state.tasks, action.payload]};
		case 'UPDATE_TASK':
			return {
				...state,
				tasks: state.tasks.map(task =>
					task.id === action.payload.id ? action.payload : task,
				),
			};
		case 'DELETE_TASK':
			return {
				...state,
				tasks: state.tasks.filter(task => task.id !== action.payload),
				selectedTaskId:
					state.selectedTaskId === action.payload
						? undefined
						: state.selectedTaskId,
			};
		case 'TOGGLE_TASK':
			return {
				...state,
				tasks: state.tasks.map(task =>
					task.id === action.payload
						? {
								...task,
								completed: !task.completed,
								updatedAt: new Date(),
						  }
						: task,
				),
			};
		case 'SET_SELECTED_TASK':
			return {...state, selectedTaskId: action.payload};
		case 'SHOW_MODAL':
			return {...state, showModal: true, modalType: action.payload.type};
		case 'HIDE_MODAL':
			return {...state, showModal: false, modalType: undefined};
		case 'SET_FILTER':
			return {...state, filter: {...state.filter, ...action.payload}};
		case 'SET_THEME':
			return {...state, theme: action.payload};
		case 'CHANGE_TASK_STATUS':
			return {
				...state,
				tasks: state.tasks.map(task => {
					if (task.id === action.payload.taskId) {
						const {newStatus} = action.payload;
						if (!canTransitionTo(task.status, newStatus)) {
							return task;
						}
						
						const newStatusHistory = [
							...task.statusHistory,
							{
								status: newStatus,
								timestamp: new Date(),
							},
						];
						
						return {
							...task,
							status: newStatus,
							statusHistory: newStatusHistory,
							updatedAt: new Date(),
							completed: newStatus === '終了',
						};
					}
					return task;
				}),
			};
		default:
			return state;
	}
}

const AppContext = createContext<{
	state: AppState;
	dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({children}: {children: React.ReactNode}) {
	const [state, dispatch] = useReducer(appReducer, initialState);

	useEffect(() => {
		const loadData = async () => {
			try {
				const tasks = await loadTasks();
				dispatch({type: 'SET_TASKS', payload: tasks});
			} catch (error) {
				console.error('Failed to load tasks:', error);
			}
		};

		loadData();
	}, []);

	useEffect(() => {
		const saveData = async () => {
			try {
				await saveTasks(state.tasks);
			} catch (error) {
				console.error('Failed to save tasks:', error);
			}
		};

		if (state.tasks.length > 0) {
			saveData();
		}
	}, [state.tasks]);

	return (
		<AppContext.Provider value={{state, dispatch}}>
			{children}
		</AppContext.Provider>
	);
}

export function useApp() {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useApp must be used within an AppProvider');
	}

	return context;
}

export {getValidNextStatuses, canTransitionTo};