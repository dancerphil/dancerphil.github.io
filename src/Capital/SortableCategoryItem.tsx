import { ActionIcon } from '@mantine/core';
import { IconTrash, IconGripVertical } from '@tabler/icons-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Category } from './types';
import { sortableItemCss, dragHandleCss } from './styles';

interface SortableCategoryItemProps {
    category: Category;
    onDelete: (id: string) => void;
}

export const SortableCategoryItem = ({ category, onDelete }: SortableCategoryItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: category.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className={sortableItemCss}>
            <div {...attributes} {...listeners} className={dragHandleCss}>
                <IconGripVertical size={18} />
            </div>
            <span style={{ flex: 1 }}>{category.name}</span>
            <ActionIcon
                color="red"
                variant="subtle"
                onClick={() => onDelete(category.id)}
                size="sm"
            >
                <IconTrash size={16} />
            </ActionIcon>
        </div>
    );
};
