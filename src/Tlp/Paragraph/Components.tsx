import { useEffect, useRef, ReactNode } from 'react';
import { Tooltip } from '@mantine/core';
import { render } from 'katex';
import 'katex/dist/katex.css';
import c from './Components.module.css';

interface ChildrenProps {
    children: string;
}

export const Emphasis = ({ children }: ChildrenProps) => {
    return children.split('').map((char, index) => (
        <span key={index} className={c.dot}>
            {char}
        </span>
    ));
};

export const Footnote = ({ children }: ChildrenProps) => {
    return (
        <Tooltip label={children}>
            <sup className={c.icon}>ⓘ</sup>
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

export const KaiTi = ({ children }: { children: ReactNode }) => (
    <span className={c.kaiTi}>{children}</span>
);

export const Centered = ({ children }: { children: ReactNode }) => (
    <div className={c.centered}>{children}</div>
);

export const I = ({ children }: { children: ReactNode }) => (
    <i className={c.i}>{children}</i>
);
