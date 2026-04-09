import { Button, Stack } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ResizeLayout } from '@/components/ResizeLayout';
import { Category, AssetItem } from './types';
import { STORAGE_KEY, defaultCategories, defaultAssetItems } from './constants';
import { containerCss, leftPanelCss, rightPanelCss, sectionCss } from './styles';
import { CategorySection } from './CategorySection';
import { AssetItemSection } from './AssetItemSection';
import { AddAssetItemForm } from './AddAssetItemForm';
import { SankeyChart } from './SankeyChart';

interface CapitalData {
    categories: Category[];
    assetItems: AssetItem[];
}

export const Capital = () => {
    const [data, setData] = useLocalStorage<CapitalData>({
        key: STORAGE_KEY,
        defaultValue: {
            categories: defaultCategories,
            assetItems: defaultAssetItems,
        },
    });

    const categories = data.categories;
    const assetItems = data.assetItems;

    const setCategories = (updater: Category[] | ((prev: Category[]) => Category[])) => {
        setData(prevData => ({
            ...prevData,
            categories: typeof updater === 'function' ? updater(prevData.categories) : updater,
        }));
    };

    const setAssetItems = (updater: AssetItem[] | ((prev: AssetItem[]) => AssetItem[])) => {
        setData(prevData => ({
            ...prevData,
            assetItems: typeof updater === 'function' ? updater(prevData.assetItems) : updater,
        }));
    };

    // DnD sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    // 添加类别
    const handleAddCategory = (name: string) => {
        const newId = Date.now().toString();
        setCategories([...categories, { id: newId, name }]);
    };

    // 删除类别
    const handleDeleteCategory = (id: string) => {
        setData(prevData => ({
            categories: prevData.categories.filter(c => c.id !== id),
            assetItems: prevData.assetItems.filter(item => item.category !== id),
        }));
    };

    // 添加资产项
    const handleAddItem = (name: string, category: string, amount: number) => {
        const newId = Date.now().toString();
        setAssetItems([...assetItems, { id: newId, name, category, amount }]);
    };

    // 删除资产项
    const handleDeleteItem = (id: string) => {
        setAssetItems(assetItems.filter(item => item.id !== id));
    };

    // 更新资产项名称
    const handleUpdateName = (id: string, name: string) => {
        setAssetItems(assetItems.map(item => item.id === id ? { ...item, name } : item));
    };

    // 更新资产项类别
    const handleUpdateCategory = (id: string, category: string) => {
        setAssetItems(assetItems.map(item => item.id === id ? { ...item, category } : item));
    };

    // 更新资产项金额
    const handleUpdateAmount = (id: string, amount: number | string) => {
        const numAmount = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
        setAssetItems(assetItems.map(item => item.id === id ? { ...item, amount: numAmount } : item));
    };

    // 处理类别拖拽排序
    const handleCategoryDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setCategories((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    // 处理资产项拖拽排序
    const handleAssetItemDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setAssetItems((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const leftPanel = (
        <div className={leftPanelCss}>
            <Stack gap="lg">
                <CategorySection
                    categories={categories}
                    sensors={sensors}
                    onDragEnd={handleCategoryDragEnd}
                    onAdd={handleAddCategory}
                    onDelete={handleDeleteCategory}
                />

                <AssetItemSection
                    assetItems={assetItems}
                    categories={categories}
                    sensors={sensors}
                    onDragEnd={handleAssetItemDragEnd}
                    onUpdateName={handleUpdateName}
                    onUpdateCategory={handleUpdateCategory}
                    onUpdateAmount={handleUpdateAmount}
                    onDelete={handleDeleteItem}
                />

                <AddAssetItemForm
                    categories={categories}
                    onAdd={handleAddItem}
                />

                <div className={sectionCss}>
                    <Button
                        variant="outline"
                        color="gray"
                        onClick={() => {
                            if (confirm('确定要重置所有数据吗？')) {
                                setData({
                                    categories: defaultCategories,
                                    assetItems: defaultAssetItems,
                                });
                            }
                        }}
                        fullWidth
                    >
                        重置为默认数据
                    </Button>
                </div>
            </Stack>
        </div>
    );

    const rightPanel = (
        <div className={rightPanelCss}>
            <SankeyChart assetItems={assetItems} categories={categories} />
        </div>
    );

    // eslint-disable-next-line max-lines
    return (
        <div className={containerCss}>
            <ResizeLayout
                groupId="capital-layout"
                left={leftPanel}
                right={rightPanel}
                leftProps={{ defaultSize: 30, minSize: 20 }}
                rightProps={{ defaultSize: 70, minSize: 30 }}
            />
        </div>
    );
};
