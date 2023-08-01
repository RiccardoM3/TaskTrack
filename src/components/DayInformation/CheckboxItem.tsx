import { HTMLAttributes, PropsWithChildren } from 'react';
import './CheckboxItem.css';
import { CSSProperties } from 'react';

function CheckboxItem({ children, ...rest }: PropsWithChildren & HTMLAttributes<HTMLDivElement>) {
    return <div className="checkbox-item" {...rest}>{children}</div>;
}

export default CheckboxItem;
