import { RecurringTask, recurringTaskCompleteForDay, Task } from '../../api/Task';
import TaskController from '../../api/TaskController';
import DateBox from './DateBox';
import './yearlyCalendar.css';

type Props = {
    year: number;
    setYear: React.Dispatch<React.SetStateAction<number>>;
    selectedDay: Date;
    setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
};
function YearlyCalendar({ year, setYear, selectedDay, setSelectedDay }: Props) {
    const days: Date[] = getDaysInYear(year);

    return (
        <div className="yearly-calendar">
            <div className="calendar-container">
                <div className="grid-container">
                    <div className="">Mon</div>
                    <div>Tues</div>
                    <div>Wed</div>
                    <div>Thur</div>
                    <div>Fri</div>
                    <div>Sat</div>
                    <div>Sun</div>
                    {days.map((date: Date) => {
                        return (
                            <DateBox
                                year={year}
                                date={date}
                                key={date.toDateString()}
                                selected={date.toDateString() === selectedDay.toDateString()}
                                level={getLevel(date)} //TODO: this is inefficient
                                onClick={() => {
                                    setSelectedDay(date);
                                }}
                            ></DateBox>
                        );
                    })}
                </div>
                <div className="month-label-container">
                    <div>Jan</div>
                    <div>Feb</div>
                    <div>Mar</div>
                    <div>Apr</div>
                    <div>May</div>
                    <div>Jun</div>
                    <div>Jul</div>
                    <div>Aug</div>
                    <div>Sep</div>
                    <div>Oct</div>
                    <div>Nov</div>
                    <div>Dec</div>
                </div>
            </div>
        </div>
    );
}

/**
 * No tasks = null
 * 0% completed tasks = level 0
 * 1% - 33% completed tasks = level 1
 * 34% - 66% compelted tasks = level 2
 * 67% - 99% compelted tasks = level 3
 * 100% compelted tasks = level 4
 */
const getLevel = (date: Date): number | null => {
    let dayTasks: Task[] = TaskController.getTasksForDate(date);
    let recurringTasks: RecurringTask[] = TaskController.getRecurringTasksForDate(date);

    let totalTasks = dayTasks.length + recurringTasks.length;

    let finishedTasks = dayTasks.reduce((prev, currentTask) => {
        return currentTask.complete ? prev + 1 : prev;
    }, 0);
    finishedTasks = recurringTasks.reduce((prev, currentRecurringTask) => {
        return recurringTaskCompleteForDay(currentRecurringTask, date) ? prev + 1 : prev;
    }, finishedTasks);

    if (totalTasks === 0) {
        return null;
    } else if (finishedTasks === 0) {
        return 0;
    } else if (finishedTasks / totalTasks <= 0.3334) {
        return 1;
    } else if (finishedTasks / totalTasks <= 0.6667) {
        return 2;
    } else if (finishedTasks / totalTasks <= 0.9999) {
        return 3;
    } else {
        return 4;
    }
};

const getDaysInYear = (year: number): Date[] => {
    let date: Date = new Date(year, 0, 1);
    let days = [];

    //Fill in the days prior to the year that are in the same week
    date.setDate(date.getDate() - 1);
    while (date.getDay() !== 0) {
        days.push(new Date(date));
        date.setDate(date.getDate() - 1);
    }
    days.reverse();

    //Fill in the days of the year
    date = new Date(year, 0, 1);
    while (date.getFullYear() === year) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    //Fill in the days following the year that are in the same week
    while (date.getDay() !== 1) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    return days;
};

export default YearlyCalendar;
