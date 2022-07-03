type Task = {
    id: string;
    description: string;
    complete: boolean;
};

class DateTasks {
    private date: Date;
    private tasks: Task[];

    constructor(date: Date, tasks: Task[]) {
        this.date = date;
        this.tasks = tasks;
    }
}

class RecurringTask {
    private task: Task;
    private startDate: Date;
    private endDate: Date;

    constructor(task: Task, startDate: Date, endDate: Date) {
        this.task = task;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public serialise = (): string => {
        return JSON.stringify({ i: this.task, s: this.startDate, e: this.endDate });
    };
}

export { type Task, DateTasks, RecurringTask };
