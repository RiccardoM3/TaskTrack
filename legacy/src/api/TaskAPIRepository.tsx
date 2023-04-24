import { RecurringTask, Task } from './Task';

/**
 * This repository will send api requests to the backend to update task data, once I create a backend
 */
class TaskAPIRepository {
    static getAllActiveRecurringTasks(): RecurringTask[] {
        return [];
    }

    static getAllInactiveRecurringTasks(): RecurringTask[] {
        return [];
    }

    static addRecurringTask(description: string): Task {
        let newTask: Task = { id: '', description: description, complete: false };
        return newTask;
    }

    static removeRecurringTask(taskId: string) {
        return null;
    }

    static getTasksForDate(day: Date): Task[] {
        return [];
    }

    static getRecurringTasksForDate(day: Date): RecurringTask[] {
        return [];
    }

    static addTaskToDate(date: Date, description: string): Task {
        return { id: '', description: '', complete: false };
    }

    static removeTaskFromDate(date: Date, taskId: string) {}

    static setTaskCompleteForDate(date: Date, taskId: string, complete: boolean) {
        return;
    }

    static setRecurringTaskCompleteForDate(date: Date, taskId: string, complete: boolean) {
        return;
    }
}

export default TaskAPIRepository;
