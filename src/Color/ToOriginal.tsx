import { useState } from 'react';
import { ColorPicker, ColorSwatch, NumberInput, Popover, Slider, TextInput, UnstyledButton, Flex } from '@mantine/core';
import { ToOriginalRow } from './ToOriginalRow';

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(200px, 1fr))',
    gap: '10px',
};

const colors = [
    '#b3b3b3',
    '#e6b3b3',
    '#b3e6b3',
    '#b3b3e6',
    '#e6e6b3',
    '#e6b3e6',
    '#b3e6e6',
    '#ffcccc',
    '#ccffcc',
    '#ccccff',
    '#ffffcc',
    '#ffccff',
];

export const ToOriginal = () => {
    const [alpha, setAlpha] = useState(0.7);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [colorPickerBg, setColorPickerBg] = useState('#ffffff');

    const handleBgColorChange = (color: string) => {
        setColorPickerBg(color);
        setBackgroundColor(color);
    };

    const header = (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
            <Flex align="center" gap={8}>
                <span>背景色：</span>
                <Popover radius="md" position="bottom" shadow="md">
                    <Popover.Target>
                        <UnstyledButton>
                            <ColorSwatch color={backgroundColor} size={32} radius="sm" />
                        </UnstyledButton>
                    </Popover.Target>
                    <Popover.Dropdown p={8}>
                        <ColorPicker
                            value={colorPickerBg}
                            onChange={handleBgColorChange}
                            format="hex"
                        />
                        <TextInput
                            value={colorPickerBg}
                            onChange={e => handleBgColorChange(e.currentTarget.value)}
                            placeholder="Enter color"
                            size="xs"
                            mt="xs"
                        />
                    </Popover.Dropdown>
                </Popover>
                <span>{backgroundColor}</span>
            </Flex>
            <Flex align="center" gap={8}>
                <span>透明度：</span>
                <Slider
                    style={{ width: '200px' }}
                    min={0.01}
                    max={1}
                    step={0.01}
                    value={alpha}
                    onChange={setAlpha}
                />
                <NumberInput
                    style={{ width: '80px' }}
                    min={0.01}
                    max={1}
                    step={0.01}
                    value={alpha}
                    onChange={value => setAlpha(typeof value === 'number' ? value : 0.01)}
                />
                <span>({Math.round(alpha * 100)}%)</span>
            </Flex>
            <div></div>
        </div>
    );

    return (
        <div style={{ marginBottom: '20px' }}>
            {header}
            <div style={gridStyle}>
                <div>显示颜色（此列可调整）</div>
                <div>原始颜色</div>
                <div>原始颜色（带透明度）</div>
                <div>展示效果</div>

                {colors.map((displayColor, index) => {
                    return <ToOriginalRow key={index} displayColor={displayColor} alpha={alpha} backgroundColor={backgroundColor} />;
                })}
            </div>
        </div>
    );
};
