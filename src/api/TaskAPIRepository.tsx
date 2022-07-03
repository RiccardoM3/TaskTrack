import { Task } from './Task';

/**
 * This repository will send api requests to the backend to update task data, once I create a backend
 */
class TaskAPIRepository {
    static getActiveRecurringTasks() {}

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

    static addTaskToDate(date: Date, description: string): Task {
        return { id: '', description: '', complete: false };
    }

    static removeTaskFromDate(date: Date, taskId: string) {}

    static setTaskCompleteForDate(date: Date, taskId: string, complete: boolean) {
        let currentDateTasks: Task[] = this.getTasksForDate(date);
        let dateTasks = currentDateTasks.filter((task: Task) => {
            return task.id === taskId;
        });

        if (dateTasks.length === 0) return;
        const dateTask = dateTasks[0];
        dateTask.complete = complete;
    }
}

export default TaskAPIRepository;
