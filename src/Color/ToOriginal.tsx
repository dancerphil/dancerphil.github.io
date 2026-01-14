import { useState } from 'react';
import { ColorPicker, ColorSwatch, NumberInput, Popover, Slider, TextInput, UnstyledButton } from '@mantine/core';
import { css } from '@emotion/css';
import { ToOriginalRow } from './ToOriginalRow';

const headerCss = css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
`;

const headerItemCss = css`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const gridCss = css`
    display: grid;
    grid-template-columns: repeat(4, minmax(200px, 1fr));
    gap: 10px;
`;

// 示例颜色列表
const colors = [
    '#b3b3b3', // 灰色
    '#e6b3b3', // 浅红
    '#b3e6b3', // 浅绿
    '#b3b3e6', // 浅蓝
    '#e6e6b3', // 浅黄
    '#e6b3e6', // 浅紫
    '#b3e6e6', // 浅青
    '#ffcccc', // 粉红
    '#ccffcc', // 浅草绿
    '#ccccff', // 浅蓝紫
    '#ffffcc', // 浅黄
    '#ffccff', // 浅粉紫
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
        <div className={headerCss}>
            <div className={headerItemCss}>
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
            </div>
            <div className={headerItemCss}>
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
            </div>
            <div></div>
        </div>
    );

    return (
        <div style={{ marginBottom: '20px' }}>
            {header}
            <div className={gridCss}>
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
