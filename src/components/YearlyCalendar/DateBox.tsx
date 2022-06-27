import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import './dateBox.css';

type Props = {
    year: Number;
    date: Date;
    onClick: () => void;
};

/**
 * Gets the day, where the week starts from monday instead of sunday
 */
const getTrueDay = (date: Date) => {
    return (date.getDay() + 6) % 7;
};

const DateBox = (props: Props) => {
    let classes = 'date-box ';

    if (props.date.getFullYear() !== props.year) {
        classes += 'not-this-year ';
    }

    let lastDayOfMonth = new Date(
        props.date.getFullYear(),
        props.date.getMonth() + 1,
        0
    );

    if (
        lastDayOfMonth.getDate() - props.date.getDate() <
        getTrueDay(lastDayOfMonth) - getTrueDay(props.date)
    ) {
        classes += 'me-2 ';
    }

    let firstDayOfMonth = new Date(
        props.date.getFullYear(),
        props.date.getMonth(),
        1
    );

    if (props.date.getDate() <= 7 - getTrueDay(firstDayOfMonth)) {
        classes += 'ms-2 ';
    }

    return (
        <OverlayTrigger
            key={props.date.getTime()}
            placement="right"
            overlay={
                <Tooltip id={`tooltip-` + props.date.getTime()}>
                    {props.date.toLocaleDateString('en-au', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                    })}
                </Tooltip>
            }
        >
            <div className={classes} onClick={props.onClick}></div>
        </OverlayTrigger>
    );
};

export default DateBox;
