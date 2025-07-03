export type TaskStatus = '作成' | '見積' | '開始' | '終了';

export interface Task {
	id: string;
	title: string;
	description?: string;
	completed: boolean;
	priority: 'low' | 'medium' | 'high';
	createdAt: Date;
	updatedAt: Date;
	dueDate?: Date;
	category: string;
	status: TaskStatus;
	statusHistory: {
		status: TaskStatus;
		timestamp: Date;
	}[];
	estimatedHours?: number;
	actualHours?: number;
	startDate?: Date;
	endDate?: Date;
}

export interface AppState {
	tasks: Task[];
	currentScreen: Screen;
	selectedTaskId?: string;
	showModal: boolean;
	modalType?: 'create' | 'edit' | 'confirm';
	theme: Theme;
	categories: string[];
	filter: TaskFilter;
}

export type Screen = 'dashboard' | 'tasks' | 'settings' | 'gantt';

export interface Theme {
	primary: string;
	secondary: string;
	accent: string;
	background: string;
	text: string;
	success: string;
	warning: string;
	error: string;
}

export interface TaskFilter {
	category?: string;
	completed?: boolean;
	priority?: Task['priority'];
	search?: string;
}

export type Action =
	| {type: 'SET_SCREEN'; payload: Screen}
	| {type: 'SET_TASKS'; payload: Task[]}
	| {type: 'ADD_TASK'; payload: Task}
	| {type: 'UPDATE_TASK'; payload: Task}
	| {type: 'DELETE_TASK'; payload: string}
	| {type: 'TOGGLE_TASK'; payload: string}
	| {type: 'SET_SELECTED_TASK'; payload: string | undefined}
	| {type: 'SHOW_MODAL'; payload: {type: 'create' | 'edit' | 'confirm'}}
	| {type: 'HIDE_MODAL'}
	| {type: 'SET_FILTER'; payload: TaskFilter}
	| {type: 'SET_THEME'; payload: Theme}
	| {type: 'CHANGE_TASK_STATUS'; payload: {taskId: string; newStatus: TaskStatus}};