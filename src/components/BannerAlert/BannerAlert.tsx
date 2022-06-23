import React from 'react';
import './bannerAlert.css';

type BannerAlert =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info';

type Props = {
    variant?: BannerAlert;
    children: any;
};

function BannerAlert(props: Props) {
    return (
        <div
            className={
                'd-block w-100 m-0 text-center ' +
                (props.variant != null ? 'bg-lt-' + props.variant : null)
            }
        >
            {props.children}
        </div>
    );
}

export default BannerAlert;
