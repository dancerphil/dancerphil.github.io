import { useState } from 'react';
import { Stack, Group, Title, TextInput, NumberInput, Button, Select } from '@mantine/core';
import { Category } from './types';
import { sectionCss } from './styles';

interface AddAssetItemFormProps {
    categories: Category[];
    onAdd: (name: string, category: string, amount: number) => void;
}

export const AddAssetItemForm = ({ categories, onAdd }: AddAssetItemFormProps) => {
    const [newItemName, setNewItemName] = useState('');
    const [newItemCategory, setNewItemCategory] = useState('');
    const [newItemAmount, setNewItemAmount] = useState<number | string>(0);

    const handleAdd = () => {
        if (!newItemName.trim() || !newItemCategory) return;
        const amount = typeof newItemAmount === 'number' ? newItemAmount : parseFloat(newItemAmount) || 0;
        onAdd(newItemName.trim(), newItemCategory, amount);
        setNewItemName('');
        setNewItemCategory('');
        setNewItemAmount(0);
    };

    return (
        <div className={sectionCss}>
            <Title order={4} mb="md">添加资产项</Title>
            <Stack gap="sm">
                <Group gap="xs" align="end">
                    <TextInput
                        label="名称"
                        placeholder="例如：工商银行"
                        value={newItemName}
                        onChange={e => setNewItemName(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <Select
                        label="类别"
                        placeholder="选择"
                        value={newItemCategory}
                        onChange={value => setNewItemCategory(value || '')}
                        data={categories.map(c => ({ value: c.id, label: c.name }))}
                        style={{ flex: 1 }}
                    />
                </Group>
                <NumberInput
                    label="金额"
                    placeholder="0"
                    value={newItemAmount}
                    onChange={setNewItemAmount}
                    prefix="¥"
                    thousandSeparator=","
                    decimalScale={2}
                />
                <Button onClick={handleAdd} fullWidth>
                    添加资产项
                </Button>
            </Stack>
        </div>
    );
};
