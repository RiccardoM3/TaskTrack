import { PropsWithChildren } from 'react';
import './Card.css';

type Props = {
    bordered?: boolean;
};

const Card = ({ children, bordered }: Props & PropsWithChildren & React.HTMLAttributes<HTMLElement>) => {
    return <div className={'custom-card' + (bordered ? ' bordered' : '')}>{children}</div>;
};

Card.Header = ({ children }: React.HTMLAttributes<HTMLElement>) => {
    return <div className="custom-card-header">{children}</div>;
};

Card.Body = ({ children }: React.HTMLAttributes<HTMLElement>) => {
    return <div className="custom-card-body">{children}</div>;
};

export default Card;
