import { useState } from 'react';
import { ColorPicker, ColorSwatch, Popover, TextInput, UnstyledButton, Flex } from '@mantine/core';
import { TinyColor } from '@ctrl/tinycolor';
import { calculateAlpha } from './calculate';

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(200px, 1fr))',
    gap: '10px',
};

function toColor(hex: string) {
    const color = new TinyColor(hex);
    const { r, g, b } = color.toRgb();

    if (r !== g || g !== b) {
        throw new Error(`${hex} is not a gray color! RGB values must be equal.`);
    }

    const grayValue = r;

    const alphaOnWhite = calculateAlpha({
        displayColor: hex,
        originalColor: '#000000',
        backgroundColor: '#ffffff',
    });

    const alphaOnBlack = calculateAlpha({
        displayColor: hex,
        originalColor: '#ffffff',
        backgroundColor: '#000000',
    });

    return {
        hex,
        grayValue,
        rgbaOnWhite: `rgba(0, 0, 0, ${Math.round(alphaOnWhite * 100) / 100})`,
        rgbaOnBlack: `rgba(255, 255, 255, ${Math.round(alphaOnBlack * 100) / 100})`,
    };
}

const colors = [
    '#000000',
    '#0a0a0a',
    '#1a1a1a',
    '#333333',
    '#4d4d4d',
    '#808080',
    '#b3b3b3',
    '#cccccc',
    '#e6e6e6',
    '#f5f5f5',
    '#ffffff',
];

interface RowProps {
    value: string;
}

export const Row = ({ value }: RowProps) => {
    const [hex, setHex] = useState(value);
    const [colorPickerValue, setColorPickerValue] = useState(value);
    const { grayValue, rgbaOnWhite, rgbaOnBlack } = toColor(hex);

    const handleColorChange = (color: string) => {
        setColorPickerValue(color);
        const r = color.slice(1, 3);
        setHex(`#${r}${r}${r}`);
    };

    return (
        <>
            <Flex align="center" gap={8}>
                <Popover radius="md" position="bottom" shadow="md">
                    <Popover.Target>
                        <UnstyledButton>
                            <ColorSwatch color={hex} size={32} radius="sm" />
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
                {hex}
            </Flex>
            <Flex align="center" gap={8}>
                {grayValue}
            </Flex>
            <Flex align="center" gap={8}>
                <ColorSwatch color={rgbaOnWhite} size={32} radius="sm" />
                {rgbaOnWhite}
            </Flex>
            <Flex align="center" gap={8}>
                <ColorSwatch
                    color={rgbaOnBlack}
                    size={32}
                    radius="sm"
                    style={{
                        '--alpha-overlay-color': 'var(--mantine-color-gray-9)',
                        '--alpha-overlay-bg': 'var(--mantine-color-black)',
                    } as React.CSSProperties}
                />
                {rgbaOnBlack}
            </Flex>
        </>
    );
};

export const GrayToAlpha = () => {
    return (
        <div style={gridStyle}>
            <div>灰色 Hex（此列可调整）</div>
            <div>灰度值</div>
            <div>透明黑色（白底）</div>
            <div>透明白色（黑底）</div>
            {colors.map((hex, index) => <Row key={index} value={hex} />)}
        </div>
    );
};
