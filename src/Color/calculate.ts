import { TinyColor } from '@ctrl/tinycolor';

interface ParamsCalculateAlpha {
    displayColor: string;
    originalColor: string;
    backgroundColor: string;
}

/**
 * 计算透明度
 * 给定显示颜色、原始颜色和背景颜色，计算透明度 alpha
 * 公式：displayColor = originalColor * alpha + backgroundColor * (1 - alpha)
 * 解得：alpha = (displayColor - backgroundColor) / (originalColor - backgroundColor)
 */
export const calculateAlpha = ({ displayColor, originalColor, backgroundColor }: ParamsCalculateAlpha): number => {
    const display = new TinyColor(displayColor).toRgb();
    const original = new TinyColor(originalColor).toRgb();
    const bg = new TinyColor(backgroundColor).toRgb();

    // 使用 R 通道计算 alpha（也可以用 G 或 B，理论上应该相同）
    // alpha = (displayColor - backgroundColor) / (originalColor - backgroundColor)
    const alphaDenominator = original.r - bg.r;

    if (Math.abs(alphaDenominator) < 0.001) {
        // 如果原始颜色和背景颜色在某个通道上相同，则无法计算
        throw new Error('Original color and background color are too similar to calculate alpha');
    }

    const alphaR = (display.r - bg.r) / alphaDenominator;

    // 可选：验证其他通道的 alpha 值是否一致
    const alphaG = Math.abs(original.g - bg.g) > 0.001 ? (display.g - bg.g) / (original.g - bg.g) : alphaR;
    const alphaB = Math.abs(original.b - bg.b) > 0.001 ? (display.b - bg.b) / (original.b - bg.b) : alphaR;

    // 取平均值以获得更稳定的结果
    const alpha = (alphaR + alphaG + alphaB) / 3;

    // 将 alpha 限制在 [0, 1] 范围内
    return Math.max(0, Math.min(1, alpha));
};

interface ParamsCalculateOriginalColor {
    displayColor: string;
    backgroundColor: string;
    alpha: number;
}

/**
 * 反向计算：从混合结果推导原色
 * 给定显示颜色、背景颜色和透明度，计算原始颜色
 * 公式：displayColor = originalColor * alpha + backgroundColor * (1 - alpha)
 * 解得：originalColor = (displayColor - backgroundColor * (1 - alpha)) / alpha
 */
export const calculateOriginal = ({ displayColor, backgroundColor, alpha }: ParamsCalculateOriginalColor) => {
    if (alpha === 0) {
        throw new Error('Alpha cannot be 0');
    }

    const display = new TinyColor(displayColor).toRgb();
    const bg = new TinyColor(backgroundColor).toRgb();

    // 反推公式：originalColor = (displayColor - backgroundColor * (1 - alpha)) / alpha
    const calcChannel = (displayVal: number, bgVal: number) => {
        return Math.round((displayVal - bgVal * (1 - alpha)) / alpha);
    };

    const r = calcChannel(display.r, bg.r);
    const g = calcChannel(display.g, bg.g);
    const b = calcChannel(display.b, bg.b);

    // 检查计算出的颜色是否在有效范围内（未被截断）
    const valid = r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;

    // 限制在有效范围 [0, 255]
    const clamp = (val: number) => Math.max(0, Math.min(255, val));

    const original = new TinyColor({
        r: clamp(r),
        g: clamp(g),
        b: clamp(b),
    });

    return {
        valid,
        original,
    };
};
