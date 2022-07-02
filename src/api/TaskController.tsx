import { Task } from './Task';

class TaskController {
    static loggedIn: boolean = false;

    static getTasksForDay(): Task[] {
        if (this.loggedIn) {
            return [];
        } else {
            return [];
        }
    }

    static getRecurringTasks() {
        if (this.loggedIn) {
            return [];
        } else {
            return [];
        }
    }

    static addRecurringTask() {
        if (this.loggedIn) {
            return [];
        } else {
            return [];
        }
    }

    static removeRecurringTask() {
        if (this.loggedIn) {
            return [];
        } else {
            return [];
        }
    }

    static addTaskToDay() {
        if (this.loggedIn) {
            return [];
        } else {
            return [];
        }
    }

    static removeTaskFromDay() {
        if (this.loggedIn) {
            return [];
        } else {
            return [];
        }
    }
}

export default TaskController;
