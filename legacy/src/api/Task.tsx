import { isWithinInterval } from 'date-fns';

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

//When we convert a recurring task into a class, this will be a method
const recurringTaskCompleteForDay = (recurringTask: RecurringTask, day: Date): boolean => {
    for (let period of recurringTask.completePeriods) {
        if (isWithinInterval(day, period)) {
            return true;
        }
    }
    return false;
};

export { type Task, DateTasks, type RecurringTask, type DateInterval, recurringTaskCompleteForDay };
