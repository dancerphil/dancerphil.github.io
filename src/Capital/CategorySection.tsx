import { useState } from 'react';
import { Stack, Group, Title, TextInput, ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { DndContext, closestCenter, DragEndEvent, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Category } from './types';
import { SortableCategoryItem } from './SortableCategoryItem';
import { sectionCss } from './styles';

interface CategorySectionProps {
    categories: Category[];
    sensors: ReturnType<typeof useSensors>;
    onDragEnd: (event: DragEndEvent) => void;
    onAdd: (name: string) => void;
    onDelete: (id: string) => void;
}

export const CategorySection = ({
    categories,
    sensors,
    onDragEnd,
    onAdd,
    onDelete,
}: CategorySectionProps) => {
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleAdd = () => {
        if (!newCategoryName.trim()) return;
        onAdd(newCategoryName.trim());
        setNewCategoryName('');
    };

    return (
        <div className={sectionCss}>
            <Title order={4} mb="md">资产类别</Title>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
            >
                <SortableContext
                    items={categories.map(c => c.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <Stack gap="xs">
                        {categories.map(cat => (
                            <SortableCategoryItem
                                key={cat.id}
                                category={cat}
                                onDelete={onDelete}
                            />
                        ))}
                    </Stack>
                </SortableContext>
            </DndContext>
            <Group gap="xs" mt="sm">
                <TextInput
                    placeholder="新类别名称"
                    value={newCategoryName}
                    onChange={e => setNewCategoryName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAdd()}
                    style={{ flex: 1 }}
                />
                <ActionIcon onClick={handleAdd} variant="filled">
                    <IconPlus size={16} />
                </ActionIcon>
            </Group>
        </div>
    );
};
