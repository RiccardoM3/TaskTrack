import { PropsWithChildren } from 'react';
import './CheckboxItem.css';
import { CSSProperties } from 'react';

interface Props {
    style: CSSProperties
  }

function CheckboxItem({ children, style }: PropsWithChildren<Props>) {
    return <div className="checkbox-item" style={style} >{children}</div>;
}

export default CheckboxItem;
