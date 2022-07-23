type DateInterval = {
    start: Date;
    end: Date;
};

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

type RecurringTask = {
    task: Task;
    startDate: Date;
    endDate: Date | null;
    completePeriods: DateInterval[];
};

export { type Task, DateTasks, type RecurringTask, type DateInterval };
