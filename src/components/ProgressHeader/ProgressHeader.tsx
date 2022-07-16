import './progressHeader.css';

import { ProgressBar } from 'react-bootstrap';

type Props = {
    now: number;
    label: String;
};

function ProgressHeader(props: Props) {
    return (
        <ProgressBar
            className="card-header-progress w-100"
            now={props.now}
            label={<div className="ps-3">{props.label}</div>}
        />
    );
}

export default ProgressHeader;
