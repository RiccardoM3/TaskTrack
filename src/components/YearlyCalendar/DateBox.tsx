import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import './dateBox.css';

type Props = {
    year: Number;
    date: Date;
};

const DateBox = (props: Props) => {
    return (
        <OverlayTrigger
            key={props.date.getTime()}
            placement="right"
            overlay={
                <Tooltip id={`tooltip-` + props.date.getTime()}>
                    {props.date.toLocaleString()}
                </Tooltip>
            }
        >
            <div
                className={
                    'date-box ' +
                    (props.date.getFullYear() !== props.year
                        ? 'not-this-year'
                        : null)
                }
            ></div>
        </OverlayTrigger>
    );
};

export default DateBox;
