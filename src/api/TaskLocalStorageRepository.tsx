import { Task, RecurringTask, DateInterval } from './Task';
import { v4 as uuid } from 'uuid';
import { addDays, differenceInCalendarDays, endOfDay, isAfter, isBefore, isEqual, startOfDay, subDays } from 'date-fns';

class TaskLocalStorageRepository {
    static getAllRecurringTasks(): RecurringTask[] {
        let recurringTaskData: string | null = localStorage.getItem('recurring');
        if (!recurringTaskData) {
            return [];
        }

        let recurringTasks = JSON.parse(recurringTaskData);
        recurringTasks = recurringTasks.map((item: any) => {
            item.startDate = new Date(item.startDate);
            if (item.endDate != null) {
                item.endDate = new Date(item.endDate);
            }
            item.completePeriods = item.completePeriods.map((period: any) => {
                return {
                    start: new Date(period.start),
                    end: new Date(period.end)
                };
            });
            return item;
        });

        return recurringTasks;
    }

    static getAllActiveRecurringTasks(): RecurringTask[] {
        let recurringTasks: RecurringTask[] = TaskLocalStorageRepository.getAllRecurringTasks();
        const currentDate = new Date();
        return recurringTasks.filter((item) => {
            return item.startDate <= currentDate && (item.endDate == null || currentDate <= item.endDate);
        });
    }

    static getAllInactiveRecurringTasks(): RecurringTask[] {
        let recurringTasks: RecurringTask[] = TaskLocalStorageRepository.getAllRecurringTasks();
        const currentDate = new Date();
        return recurringTasks.filter((item) => {
            return !(item.startDate <= currentDate && (item.endDate == null || currentDate <= item.endDate));
        });
    }

    static addRecurringTask(description: string, startDate: Date, endDate: Date | null): Task {
        startDate = startOfDay(startDate);
        if (endDate) {
            endDate = endOfDay(endDate);
        }

        let newTask: Task = { id: uuid(), description: description, complete: false };
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

    static getRecurringTasksForDate(date: Date): RecurringTask[] {
        let recurringTasks = this.getAllRecurringTasks();

        return recurringTasks.filter((item) => {
            return item.startDate <= date && (item.endDate == null || date <= item.endDate);
        });
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

    static editTask(date: Date, taskId: string, description: string) {
        let currentDateTasks: Task[] = this.getTasksForDate(date);
        let editedTask = currentDateTasks.find((task: Task) => (task.id === taskId));
        editedTask!.description = description
        
        localStorage.setItem('dt-' + date.toLocaleDateString('en-au'), JSON.stringify(currentDateTasks));
        
        return editedTask;
        
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

    static setRecurringTaskCompleteForDate(date: Date, taskId: string, complete: boolean) {
        let allRecurringTasks: RecurringTask[] = this.getAllRecurringTasks();
        let taskIndex = allRecurringTasks.findIndex((recurringTask: RecurringTask) => {
            return recurringTask.task.id === taskId;
        });

        if (taskIndex < 0) return;

        let periodsLength = allRecurringTasks[taskIndex].completePeriods.length;
        if (complete) {
            //TODO: this still has bugs

            //check if we should add it to the end of the array
            if (
                periodsLength === 0 ||
                isAfter(date, addDays(allRecurringTasks[taskIndex].completePeriods[periodsLength - 1].end, 1))
            ) {
                let newPeriod: DateInterval = { start: startOfDay(date), end: endOfDay(date) };
                allRecurringTasks[taskIndex].completePeriods.push(newPeriod);
            } else {
                for (let periodIndex = 0; periodIndex < periodsLength; periodIndex++) {
                    let period: DateInterval = allRecurringTasks[taskIndex].completePeriods[periodIndex];

                    //check if its on the start edge of a period
                    if (isEqual(date, subDays(period.start, 1))) {
                        //check if we need to merge it with the prev period
                        if (
                            periodIndex - 1 >= 0 &&
                            isEqual(allRecurringTasks[taskIndex].completePeriods[periodIndex - 1].end, subDays(date, 1))
                        ) {
                            allRecurringTasks[taskIndex].completePeriods[periodIndex - 1].end =
                                allRecurringTasks[taskIndex].completePeriods[periodIndex].end; //update the previous period
                            allRecurringTasks[taskIndex].completePeriods.splice(periodIndex, 1); //delete the current period
                        } else {
                            allRecurringTasks[taskIndex].completePeriods[periodIndex].start = subDays(period.start, 1);
                        }
                        break;
                    }
                    //check if its on the end edge of a period
                    else if (isEqual(date, addDays(period.end, 1))) {
                        //check if we need to merge it with the next period
                        if (
                            periodIndex + 1 < periodsLength &&
                            isEqual(
                                allRecurringTasks[taskIndex].completePeriods[periodIndex + 1].start,
                                addDays(date, 1)
                            )
                        ) {
                            allRecurringTasks[taskIndex].completePeriods[periodIndex].end =
                                allRecurringTasks[taskIndex].completePeriods[periodIndex + 1].end; //update the current period
                            allRecurringTasks[taskIndex].completePeriods.splice(periodIndex + 1, 1); //delete the next period
                        } else {
                            allRecurringTasks[taskIndex].completePeriods[periodIndex].end = addDays(period.end, 1);
                        }
                        break;
                    }
                    //check if it's before the period
                    else if (isBefore(date, subDays(period.start, 1))) {
                        let newPeriod: DateInterval = { start: startOfDay(date), end: endOfDay(date) };
                        allRecurringTasks[taskIndex].completePeriods.splice(periodIndex, 0, newPeriod);
                        break;
                    }
                }
            }
        } else {
            for (let periodIndex = 0; periodIndex < periodsLength; periodIndex++) {
                let { start, end } = allRecurringTasks[taskIndex].completePeriods[periodIndex];
                if (start <= date && date <= end) {
                    if (differenceInCalendarDays(start, end) === 0) {
                        //remove the period
                        allRecurringTasks[taskIndex].completePeriods.splice(periodIndex, 1);
                    } else {
                        //if on the edge, then just modify the edge of the period. otherwise split the period
                        if (isEqual(start, date)) {
                            allRecurringTasks[taskIndex].completePeriods[periodIndex].start = addDays(start, 1);
                        } else if (isEqual(end, date)) {
                            allRecurringTasks[taskIndex].completePeriods[periodIndex].end = subDays(end, 1);
                        } else {
                            let newPeriod1: DateInterval = { start: start, end: subDays(date, 1) };
                            let newPeriod2: DateInterval = { start: addDays(date, 1), end: end };
                            allRecurringTasks[taskIndex].completePeriods.splice(periodIndex, 1); //delete old period
                            allRecurringTasks[taskIndex].completePeriods.splice(periodIndex, 0, newPeriod2); //add second period
                            allRecurringTasks[taskIndex].completePeriods.splice(periodIndex, 0, newPeriod1); // add first period
                        }
                    }
                }
            }
        }

        localStorage.setItem('recurring', JSON.stringify(allRecurringTasks));
    }
}

export default TaskLocalStorageRepository;
