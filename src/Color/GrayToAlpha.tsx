import { ColorPicker } from 'antd';
import { css } from '@emotion/css';
import { TinyColor } from '@ctrl/tinycolor';
import cx from 'classnames';
import { useState } from 'react';
import { calculateAlpha } from './calculate';

const gridCss = css`
    display: grid;
    grid-template-columns: repeat(4, minmax(200px, 1fr));
    gap: 10px;
`;

const gridItemCss = css`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const blackCss = css`
    .ant-color-picker-trigger {
        background: black;
        
        .ant-color-picker-color-block {
            background-image: conic-gradient(rgba(255, 255, 255, 0.06) 25%, transparent 25% 50%, rgba(255, 255, 255, 0.06) 50% 75%, transparent 75% 100%)
        }
    }
`;

/** 灰色 Hex 转透明色 */
function toColor(hex: string) {
    const color = new TinyColor(hex);
    const { r, g, b } = color.toRgb();

    // 验证是否为灰色
    if (r !== g || g !== b) {
        throw new Error(`${hex} is not a gray color! RGB values must be equal.`);
    }

    const grayValue = r; // 灰色的 R=G=B

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
    const { grayValue, rgbaOnWhite, rgbaOnBlack } = toColor(hex);
    return (
        <>
            <div className={gridItemCss}>
                <ColorPicker
                    value={hex}
                    onChange={(value) => {
                        const r = value.toHexString().slice(1, 3);
                        setHex(`#${r}${r}${r}`);
                    }}
                />
                {hex}
            </div>
            <div className={gridItemCss}>
                {grayValue}
            </div>
            <div className={gridItemCss}>
                <ColorPicker value={rgbaOnWhite} />
                {rgbaOnWhite}
            </div>
            <div className={cx(gridItemCss, blackCss)}>
                <ColorPicker value={rgbaOnBlack} />
                {rgbaOnBlack}
            </div>
        </>
    );
};

export const GrayToAlpha = () => {
    return (
        <div className={gridCss}>
            <div>灰色 Hex（此列可调整）</div>
            <div>灰度值</div>
            <div>透明黑色（白底）</div>
            <div>透明白色（黑底）</div>
            {colors.map((hex, index) => <Row key={index} value={hex} />)}
        </div>
    );
};
