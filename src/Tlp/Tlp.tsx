import { useCallback, useEffect, MouseEvent } from 'react';
import { Box } from '@mantine/core';
import { ResizeLayout } from '@/components/ResizeLayout';
import { responsive } from '@/Tlp/styles';
import { content } from './content';
import { Paragraph } from './Paragraph';
import { activeTarget, setNodes, useActiveNodeKey } from './region';
import { Header } from './Header';
import { useShortKeys } from './useShortKeys';
import { Stream } from './Stream';

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
                <Box h="100vh" style={{ overflowY: 'auto' }}>
                    <Header />
                    <Box
                        pos="relative"
                        px={20}
                        py={40}
                        style={{ lineHeight: 2, whiteSpace: 'pre-line', fontSize: responsive.fontSize }}
                        onClick={handleClick}
                    >
                        {content.map((item, index) => {
                            return <Paragraph key={index} item={item} />;
                        })}
                    </Box>
                </Box>
            )}
            right={activeNodeKey && <Stream />}
            rightProps={{
                defaultSize: '30%',
                minSize: '25%',
            }}
        />
    );
};
