import { Stack, Title } from '@mantine/core';
import { DndContext, closestCenter, DragEndEvent, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { AssetItem, Category } from './types';
import { SortableAssetItem } from './SortableAssetItem';
import { sectionCss } from './styles';

interface AssetItemSectionProps {
    assetItems: AssetItem[];
    categories: Category[];
    sensors: ReturnType<typeof useSensors>;
    onDragEnd: (event: DragEndEvent) => void;
    onUpdateName: (id: string, name: string) => void;
    onUpdateCategory: (id: string, category: string) => void;
    onUpdateAmount: (id: string, amount: number | string) => void;
    onDelete: (id: string) => void;
}

export const AssetItemSection = ({
    assetItems,
    categories,
    sensors,
    onDragEnd,
    onUpdateName,
    onUpdateCategory,
    onUpdateAmount,
    onDelete,
}: AssetItemSectionProps) => {
    return (
        <div className={sectionCss}>
            <Title order={4} mb="md">资产项列表</Title>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
            >
                <SortableContext
                    items={assetItems.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <Stack gap="xs">
                        {assetItems.map(item => (
                            <SortableAssetItem
                                key={item.id}
                                item={item}
                                categories={categories}
                                onUpdateName={onUpdateName}
                                onUpdateCategory={onUpdateCategory}
                                onUpdateAmount={onUpdateAmount}
                                onDelete={onDelete}
                            />
                        ))}
                    </Stack>
                </SortableContext>
            </DndContext>
        </div>
    );
};
