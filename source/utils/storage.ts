import {promises as fs} from 'fs';
import path from 'path';
import {homedir} from 'os';
import {Task} from '../types.js';
import {sampleTasks} from './sample_task.js';

const DATA_DIR = path.join(homedir(), '.taskmaster');
const TASKS_FILE = path.join(DATA_DIR, 'tasks.json');

export async function ensureDataDir(): Promise<void> {
	try {
		await fs.mkdir(DATA_DIR, {recursive: true});
	} catch (error) {
		console.error('Failed to create data directory:', error);
	}
}

export async function loadTasks(): Promise<Task[]> {
	try {
		await ensureDataDir();
		const data = await fs.readFile(TASKS_FILE, 'utf8');
		const tasks = JSON.parse(data) as Task[];
		
		return tasks.map(task => ({
			...task,
			createdAt: new Date(task.createdAt),
			updatedAt: new Date(task.updatedAt),
			dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
			startDate: task.startDate ? new Date(task.startDate) : undefined,
			endDate: task.endDate ? new Date(task.endDate) : undefined,
			statusHistory: task.statusHistory.map(history => ({
				...history,
				timestamp: new Date(history.timestamp),
			})),
		}));
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
			// If tasks.json doesn't exist, use sample tasks and save them
			await saveTasks(sampleTasks);
			return sampleTasks;
		}

		throw error;
	}
}

export async function saveTasks(tasks: Task[]): Promise<void> {
	try {
		await ensureDataDir();
		await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
	} catch (error) {
		console.error('Failed to save tasks:', error);
	}
}

export function generateId(): string {
	return Date.now().toString(36) + Math.random().toString(36).slice(2);
}