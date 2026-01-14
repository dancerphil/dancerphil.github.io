import { useState } from 'react';
import { ColorPicker, ColorSwatch, Popover, TextInput, Tooltip, UnstyledButton } from '@mantine/core';
import { css } from '@emotion/css';
import { calculateOriginal } from './calculate';

const iconCss = css`
    font-size: 16px;
    color: #faad14;
    cursor: pointer;
`;

const HelpIcon = ({ tooltip }: { tooltip: string }) => (
    <Tooltip label={tooltip}>
        <span className={iconCss}>ⓘ</span>
    </Tooltip>
);

const gridItemCss = css`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const displayBgCss = css`
    width: 64px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
`;

const displayBgInnerCss = css`
    width: 56px;
    height: 24px;
    border-radius: 4px;
`;

interface RowProps {
    displayColor: string;
    alpha: number;
    backgroundColor: string;
}

export const ToOriginalRow = ({ displayColor, alpha, backgroundColor }: RowProps) => {
    const [color, setColor] = useState(displayColor);
    const [colorPickerValue, setColorPickerValue] = useState(displayColor);
    const { original, valid } = calculateOriginal({ displayColor: color, alpha, backgroundColor });
    const originalColor = original.toHexString();
    const originalRgba = original.setAlpha(alpha).toHex8String(false);
    const help = !valid && <HelpIcon tooltip="该原始颜色不存在，取值最接近的颜色" />;

    const handleColorChange = (value: string) => {
        setColorPickerValue(value);
        setColor(value);
    };

    return (
        <>
            <div className={gridItemCss}>
                <Popover radius="md" position="bottom" shadow="md">
                    <Popover.Target>
                        <UnstyledButton>
                            <ColorSwatch color={color} size={32} radius="sm" />
                        </UnstyledButton>
                    </Popover.Target>
                    <Popover.Dropdown p={8}>
                        <ColorPicker
                            value={colorPickerValue}
                            onChange={handleColorChange}
                            format="hex"
                        />
                        <TextInput
                            value={colorPickerValue}
                            onChange={e => handleColorChange(e.currentTarget.value)}
                            placeholder="Enter color"
                            size="xs"
                            mt="xs"
                        />
                    </Popover.Dropdown>
                </Popover>
                {color}
            </div>
            <div className={gridItemCss}>
                <ColorSwatch color={originalColor} size={32} radius="sm" />
                {originalColor}
                {help}
            </div>
            <div className={gridItemCss}>
                <ColorSwatch color={originalRgba} size={32} radius="sm" />
                {originalRgba}
                {help}
            </div>
            <div className={gridItemCss}>
                <div className={displayBgCss} style={{ backgroundColor }}>
                    <div className={displayBgInnerCss} style={{ backgroundColor: originalRgba }} />
                </div>
                {help}
            </div>
        </>
    );
};
