import {css} from '@emotion/css';
import {ReactNode} from 'react';

const listItemCss = css`
    padding: 8px 4px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    
    :hover {
        background-color: rgba(0, 0, 0, 0.03);
    }
`;

const aCss = css`
    width: 300px;
`;

const descriptionCss = css`
    color: rgba(0, 0, 0, 0.45);
`;

interface ListItemProps {
    href: string;
    title: ReactNode;
    description?: ReactNode;
}

export const ListItem = ({href, title, description}: ListItemProps) => {
    return (
        <a className={listItemCss} target="_blank" href={href} rel="noreferrer">
            <span className={aCss}>{title}</span>
            {description && <span className={descriptionCss}>{description}</span>}
        </a>
    );
};
