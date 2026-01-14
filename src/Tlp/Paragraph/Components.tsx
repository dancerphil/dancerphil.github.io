import { useEffect, useRef } from 'react';
import { Tooltip } from '@mantine/core';
import { render } from 'katex';
import 'katex/dist/katex.css';
import { css } from '@emotion/css';
import { responsive } from '@/Tlp/styles';

const dot = css`
    position: relative;

    ::after {
        content: '.';
        position: absolute;
        bottom: 0.15em;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 1.4em;
        color: #333;
        line-height: 0;
    }
`;

interface ChildrenProps {
    children: string;
}

export const Emphasis = ({ children }: ChildrenProps) => {
    return children.split('').map((char, index) => (
        <span key={index} className={dot}>
            {char}
        </span>
    ));
};

const iconCss = css`
    font-size: 12px;
    color: #999;
    cursor: help;
    margin: 0 3px 0 1px;
`;

export const Footnote = ({ children }: ChildrenProps) => {
    return (
        <Tooltip label={children}>
            <sup className={iconCss}>ⓘ</sup>
        </Tooltip>
    );
};

export const Katex = ({ children }: ChildrenProps) => {
    const ref = useRef(null);

    useEffect(
        () => {
            if (ref.current) {
                try {
                    render(children, ref.current, { throwOnError: false });
                }
                catch (error) {
                    console.error('Katex rendering error:', error);
                }
            }
        },
        [children],
    );

    return <span ref={ref} />;
};

const kaiTiCss = css`
    font-family: 'KaiTi', '楷体', 'STKaiti', '华文楷体', 'SimKai', serif;
    font-size: 17px;
`;

export const KaiTi = ({ children }: { children: React.ReactNode }) => (
    <span className={kaiTiCss}>{children}</span>
);

const centeredCss = css`
    text-align: center;
    width: ${responsive.contentWidth};
`;

export const Centered = ({ children }: { children: React.ReactNode }) => (
    <div className={centeredCss}>{children}</div>
);
