import { ReactNode } from 'react';
import { Text } from '@mantine/core';
import c from './ListItem.module.css';

interface ListItemProps {
    href: string;
    title: ReactNode;
    description?: ReactNode;
}

export const ListItem = ({ href, title, description }: ListItemProps) => {
    return (
        <a className={c.listItem} target="_blank" href={href} rel="noreferrer">
            <span className={c.name}>{title}</span>
            {description && <Text c="dimmed" component="span">{description}</Text>}
        </a>
    );
};
