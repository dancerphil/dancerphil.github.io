import { TextInput, NumberInput, ActionIcon, Select } from '@mantine/core';
import { IconTrash, IconGripVertical } from '@tabler/icons-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AssetItem, Category } from './types';
import { sortableItemCss, dragHandleCss } from './styles';

interface SortableAssetItemProps {
    item: AssetItem;
    categories: Category[];
    onUpdateName: (id: string, name: string) => void;
    onUpdateCategory: (id: string, category: string) => void;
    onUpdateAmount: (id: string, amount: number | string) => void;
    onDelete: (id: string) => void;
}

export const SortableAssetItem = ({
    item,
    categories,
    onUpdateName,
    onUpdateCategory,
    onUpdateAmount,
    onDelete,
}: SortableAssetItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

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
            <TextInput
                value={item.name}
                onChange={e => onUpdateName(item.id, e.target.value)}
                placeholder="名称"
                style={{ flex: '1 1 120px', minWidth: 0 }}
            />
            <Select
                value={item.category}
                onChange={value => onUpdateCategory(item.id, value || '')}
                data={categories.map(c => ({ value: c.id, label: c.name }))}
                placeholder="类别"
                style={{ flex: '0 0 100px' }}
            />
            <NumberInput
                value={item.amount}
                onChange={v => onUpdateAmount(item.id, v)}
                prefix="¥"
                thousandSeparator=","
                decimalScale={2}
                style={{ flex: '1 1 120px', minWidth: 0 }}
            />
            <ActionIcon
                color="red"
                variant="subtle"
                onClick={() => onDelete(item.id)}
                style={{ flexShrink: 0 }}
            >
                <IconTrash size={16} />
            </ActionIcon>
        </div>
    );
};
