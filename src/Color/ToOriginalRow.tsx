import { useState } from 'react';
import { ColorPicker } from 'antd';
import { css } from '@emotion/css';
import { withTooltip } from '@hero-u/ant-design';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { calculateOriginal } from './calculate';

const iconCss = css`
    font-size: 16px;
    color: #faad14;
    cursor: pointer;
`;

const HelpIcon = withTooltip(
    QuestionCircleOutlined,
    { className: iconCss },
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
    const { original, valid } = calculateOriginal({ displayColor: color, alpha, backgroundColor });
    const originalColor = original.toHexString();
    const originalRgba = original.setAlpha(alpha).toHex8String(false);
    const help = !valid && <HelpIcon tooltip="该原始颜色不存在，取值最接近的颜色" />;
    return (
        <>
            <div className={gridItemCss}>
                <ColorPicker
                    value={color}
                    onChange={(value) => {
                        setColor(value.toHexString());
                    }}
                />
                {color}
            </div>
            <div className={gridItemCss}>
                <ColorPicker value={originalColor} />
                {originalColor}
                {help}
            </div>
            <div className={gridItemCss}>
                <ColorPicker value={originalRgba} />
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
