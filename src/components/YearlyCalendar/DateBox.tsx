import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import './dateBox.css';

type Props = {
    year: number;
    date: Date;
    selected: boolean;
    level: number | null;
    onClick: () => void;
};

/**
 * Gets the day, where the week starts from monday instead of sunday
 */
const getTrueDay = (date: Date) => {
    return (date.getDay() + 6) % 7;
};

const DateBox = ({ year, date, selected, level, onClick }: Props) => {
    let classes = 'date-box';

    if (level !== null) {
        classes += ' level-' + level;
    }

    if (date.getFullYear() !== year) {
        classes += ' not-this-year';
    }

    if (date.toDateString() === new Date().toDateString()) {
        classes += ' today';
    }

    if (selected) {
        classes += ' selected';
    }

    let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    if (lastDayOfMonth.getDate() - date.getDate() < getTrueDay(lastDayOfMonth) - getTrueDay(date)) {
        classes += ' me-2';
    }

    let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    if (date.getDate() <= 7 - getTrueDay(firstDayOfMonth)) {
        classes += ' ms-2';
    }

    return (
        <OverlayTrigger
            key={date.toDateString()}
            placement="right"
            overlay={
                <Tooltip id={`tooltip-` + date.toDateString()}>
                    {date.toLocaleDateString('en-au', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                    })}
                </Tooltip>
            }
        >
            <div
                className={classes}
                onClick={() => {
                    onClick();
                }}
            ></div>
        </OverlayTrigger>
    );
};

export default DateBox;
