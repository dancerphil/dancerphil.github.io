import { css } from '@emotion/css';
import { useCallback, useEffect, MouseEvent } from 'react';
import { ResizeLayout } from '@/components/ResizeLayout';
import { content } from './content';
import { Paragraph } from './Paragraph';
import { activeTarget, setNodes, useActiveNodeKey } from './region';
import { Header } from './Header';
import { useShortKeys } from './useShortKeys';
import { Stream } from './Stream';
import { responsive } from '@/Tlp/styles';

const containerCss = css`
    height: 100vh;
    overflow-y: auto;
`;

const contentCss = css`
    position: relative;
    padding: 40px 20px;
    font-size: ${responsive.fontSize};
    line-height: 2;
    white-space: pre-line;
`;

export const Tlp = () => {
    const activeNodeKey = useActiveNodeKey();

    useShortKeys();

    useEffect(
        () => {
            const nodes = document.querySelectorAll('[data-key]');
            setNodes(nodes as NodeListOf<HTMLElement>);
            if (window.location.hash) {
                const key = window.location.hash.slice(1);
                const target = document.querySelector(`[data-key="${key}"]`);
                if (target) {
                    activeTarget(target as HTMLElement);
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        },
        [],
    );

    const handleClick = useCallback(
        (event: MouseEvent) => {
            const clickedElement = event.target as HTMLElement;
            const target = clickedElement.closest('[data-key]') as HTMLElement;
            if (!target) {
                return;
            }
            activeTarget(target);
        },
        [],
    );

    return (
        <ResizeLayout
            left={(
                <div className={containerCss}>
                    <Header />
                    <div className={contentCss} onClick={handleClick}>
                        {content.map((item, index) => {
                            return <Paragraph key={index} item={item} />;
                        })}
                    </div>
                </div>
            )}
            right={activeNodeKey && <Stream />}
            rightProps={{
                defaultSize: 30,
            }}
        />
    );
};
