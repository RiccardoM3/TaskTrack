import { RecurringTask, Task } from './Task';
import TaskLocalStorageRepository from './TaskLocalStorageRepository';
import TaskAPIRepository from './TaskAPIRepository';

class TaskController {
    static loggedIn: boolean = false;

    static getAllActiveRecurringTasks(): RecurringTask[] {
        if (this.loggedIn) {
            return TaskAPIRepository.getAllActiveRecurringTasks();
        } else {
            return TaskLocalStorageRepository.getAllActiveRecurringTasks();
        }
    }

    static getAllInactiveRecurringTasks(): RecurringTask[] {
        if (this.loggedIn) {
            return TaskAPIRepository.getAllInactiveRecurringTasks();
        } else {
            return TaskLocalStorageRepository.getAllInactiveRecurringTasks();
        }
    }

    static addRecurringTask(description: string, startDate: Date, endDate: Date | null): Task {
        if (this.loggedIn) {
            return TaskAPIRepository.addRecurringTask(description);
        } else {
            return TaskLocalStorageRepository.addRecurringTask(description, startDate, endDate);
        }
    }

    static removeRecurringTask(taskId: string) {
        if (this.loggedIn) {
            return TaskAPIRepository.removeRecurringTask(taskId);
        } else {
            return TaskLocalStorageRepository.removeRecurringTask(taskId);
        }
    }

    static getTasksForDate(day: Date): Task[] {
        if (this.loggedIn) {
            return TaskAPIRepository.getTasksForDate(day);
        } else {
            return TaskLocalStorageRepository.getTasksForDate(day);
        }
    }

    static getRecurringTasksForDate(day: Date): RecurringTask[] {
        if (this.loggedIn) {
            return TaskAPIRepository.getRecurringTasksForDate(day);
        } else {
            return TaskLocalStorageRepository.getRecurringTasksForDate(day);
        }
    }

    static addTaskToDate(date: Date, description: string): Task {
        if (this.loggedIn) {
            return TaskAPIRepository.addTaskToDate(date, description);
        } else {
            return TaskLocalStorageRepository.addTaskToDate(date, description);
        }
    }

    static removeTaskFromDate(date: Date, taskId: string) {
        if (this.loggedIn) {
            return TaskAPIRepository.removeTaskFromDate(date, taskId);
        } else {
            return TaskLocalStorageRepository.removeTaskFromDate(date, taskId);
        }
    }

    static setTaskCompleteForDate(date: Date, taskId: string, complete: boolean) {
        if (this.loggedIn) {
            return TaskAPIRepository.setTaskCompleteForDate(date, taskId, complete);
        } else {
            return TaskLocalStorageRepository.setTaskCompleteForDate(date, taskId, complete);
        }
    }

    static setRecurringTaskCompleteForDate(date: Date, taskId: string, complete: boolean) {
        if (this.loggedIn) {
            return TaskAPIRepository.setRecurringTaskCompleteForDate(date, taskId, complete);
        } else {
            return TaskLocalStorageRepository.setRecurringTaskCompleteForDate(date, taskId, complete);
        }
    }
}

export default TaskController;
