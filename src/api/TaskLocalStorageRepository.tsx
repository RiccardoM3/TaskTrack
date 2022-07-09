import { Task, RecurringTask } from './Task';
import { v4 as uuid } from 'uuid';

class TaskLocalStorageRepository {
    static getActiveRecurringTasks() {}

    static getAllRecurringTasks(): RecurringTask[] {
        let recurringTaskData: string | null = localStorage.getItem('recurring');
        if (!recurringTaskData) {
            return [];
        }

        return JSON.parse(recurringTaskData);
    }

    static addRecurringTask(description: string, startDate: Date, endDate: Date): Task {
        let newTask: Task = { id: '', description: description, complete: false };
        let newRecurringTask: RecurringTask = {
            task: newTask,
            startDate: startDate,
            endDate: endDate,
            completePeriods: []
        };

        let recurringTasks: RecurringTask[] = TaskLocalStorageRepository.getAllRecurringTasks();
        recurringTasks.push(newRecurringTask);
        localStorage.setItem('recurring', JSON.stringify(recurringTasks));

        return newTask;
    }

    static removeRecurringTask(taskId: string): Task | null {
        let recurringTasks: RecurringTask[] = TaskLocalStorageRepository.getAllRecurringTasks();
        let deletedItemIndex: number = recurringTasks.findIndex((recurringTask) => recurringTask.task.id === taskId);
        if (deletedItemIndex < 0) {
            return null;
        }

        let deletedTask = recurringTasks[deletedItemIndex].task;
        let newRecurringTasks = recurringTasks.filter((rt: RecurringTask) => rt.task.id !== taskId);
        localStorage.setItem('recurring', JSON.stringify(newRecurringTasks));
        return deletedTask;
    }

    static getTasksForDate(date: Date): Task[] {
        let dayData: string | null = localStorage.getItem('dt-' + date.toLocaleDateString('en-au'));
        if (!dayData) {
            return [];
        }

        return JSON.parse(dayData);
    }

    static addTaskToDate(date: Date, description: string): Task {
        let newTask: Task = { id: uuid(), description: description, complete: false };

        let currentDateTasks: Task[] = this.getTasksForDate(date);
        currentDateTasks.push(newTask);

        localStorage.setItem('dt-' + date.toLocaleDateString('en-au'), JSON.stringify(currentDateTasks));

        return newTask;
    }

    static removeTaskFromDate(date: Date, taskId: string) {
        let currentDateTasks: Task[] = this.getTasksForDate(date);
        currentDateTasks = currentDateTasks.filter((task: Task) => {
            return task.id !== taskId;
        });

        localStorage.setItem('dt-' + date.toLocaleDateString('en-au'), JSON.stringify(currentDateTasks));
    }

    static setTaskCompleteForDate(date: Date, taskId: string, complete: boolean) {
        let currentDateTasks: Task[] = this.getTasksForDate(date);
        let dateTasks = currentDateTasks.filter((task: Task) => {
            return task.id === taskId;
        });

        if (dateTasks.length === 0) return;
        const dateTask = dateTasks[0];
        dateTask.complete = complete;

        localStorage.setItem('dt-' + date.toLocaleDateString('en-au'), JSON.stringify(currentDateTasks));
    }
}

export default TaskLocalStorageRepository;
