import { useState } from 'react';
import { ColorPicker, ColorSwatch, Popover, TextInput, Tooltip, UnstyledButton, Flex } from '@mantine/core';
import { calculateOriginal } from './calculate';
import c from './ToOriginalRow.module.css';

const HelpIcon = ({ tooltip }: { tooltip: string }) => (
    <Tooltip label={tooltip}>
        <span className={c.icon}>ⓘ</span>
    </Tooltip>
);

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
            <Flex align="center" gap={8}>
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
            </Flex>
            <Flex align="center" gap={8}>
                <ColorSwatch color={originalColor} size={32} radius="sm" />
                {originalColor}
                {help}
            </Flex>
            <Flex align="center" gap={8}>
                <ColorSwatch color={originalRgba} size={32} radius="sm" />
                {originalRgba}
                {help}
            </Flex>
            <Flex align="center" gap={8}>
                <div className={c.displayBg} style={{ backgroundColor }}>
                    <div className={c.displayBgInner} style={{ backgroundColor: originalRgba }} />
                </div>
                {help}
            </Flex>
        </>
    );
};
