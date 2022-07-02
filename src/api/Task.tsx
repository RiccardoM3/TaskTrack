class Task {
    id: number;
    description: string;

    constructor(id: number, description: string) {
        this.id = id;
        this.description = description;
    }
}

class DailyTask {
    task: Task;
    date: Date;
    complete: boolean;

    constructor(task: Task, date: Date, complete: boolean) {
        this.task = task;
        this.date = date;
        this.complete = complete;
    }
}

class RecurringTask {
    task: Task;
    startDate: Date;
    endDate: Date;

    constructor(task: Task, startDate: Date, endDate: Date) {
        this.task = task;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

export { Task, DailyTask, RecurringTask };
