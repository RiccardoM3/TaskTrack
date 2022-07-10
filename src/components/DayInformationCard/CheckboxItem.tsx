import { PropsWithChildren } from 'react';
import './CheckboxItem.css';

function CheckboxItem({ children }: PropsWithChildren) {
    return <div className="checkbox-item">{children}</div>;
}

export default CheckboxItem;
