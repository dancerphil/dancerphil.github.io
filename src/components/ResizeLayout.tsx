import { ReactNode } from 'react';
import { Splitter } from '@mantine/core';
import type { SplitterPaneProps } from '@mantine/core';

interface Props {
    groupId?: string;
    left?: ReactNode;
    center?: ReactNode;
    right?: ReactNode;
    leftProps?: SplitterPaneProps;
    centerProps?: SplitterPaneProps;
    rightProps?: SplitterPaneProps;
}

export const ResizeLayout = ({
    groupId,
    left,
    center,
    right,
    leftProps,
    centerProps,
    rightProps,
}: Props) => {
    const panes = [
        { key: 'left', content: left, props: leftProps },
        { key: 'center', content: center, props: centerProps },
        { key: 'right', content: right, props: rightProps },
    ].filter(pane => pane.content);
    const storageKey = groupId && `resize-layout:${groupId}`;
    const savedSizes = storageKey
        ? JSON.parse(localStorage.getItem(storageKey) ?? 'null') as SplitterPaneProps['defaultSize'][] | null
        : null;
    const defaultSize = 100 / panes.length;

    return (
        <Splitter
            key={panes.map(pane => pane.key).join('-')}
            w="100%"
            h="100%"
            onResizeEnd={storageKey
                ? (_, sizes) => localStorage.setItem(storageKey, JSON.stringify(sizes))
                : undefined}
        >
            {panes.map((pane, index) => {
                return (
                    <Splitter.Pane
                        key={pane.key}
                        {...pane.props}
                        defaultSize={savedSizes?.[index] ?? pane.props?.defaultSize ?? defaultSize}
                    >
                        {pane.content}
                    </Splitter.Pane>
                );
            })}
        </Splitter>
    );
};
