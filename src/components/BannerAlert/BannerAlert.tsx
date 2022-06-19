import React from 'react';

type BannerAlert =
    | 'primary'
    | 'secondary'
    | 'dark'
    | 'light'
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
                (props.variant != null ? 'bg-' + props.variant : null)
            }
        >
            {props.children}
        </div>
    );
}

export default BannerAlert;
