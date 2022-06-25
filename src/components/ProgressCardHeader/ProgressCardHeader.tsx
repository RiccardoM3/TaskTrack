import React from 'react';
import './progressCardHeader.css';

import { Card, ProgressBar } from 'react-bootstrap';

type Props = {
    now: number;
    label: String;
};

function ProgressCardHeader(props: Props) {
    return (
        <Card.Header className="p-0">
            <ProgressBar
                className="card-header-progress w-100"
                now={props.now}
                label={<div className="ps-3">{props.label}</div>}
            />
        </Card.Header>
    );
}

export default ProgressCardHeader;
