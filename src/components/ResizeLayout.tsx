import { ReactNode } from 'react';
import { Group, Panel, PanelProps, Separator, useDefaultLayout } from 'react-resizable-panels';
import { css } from '@emotion/css';
import { useMantineTheme } from '@mantine/core';

const useHandleCss = () => {
    const theme = useMantineTheme();
    return css`
        position: relative;
        width: 1px;

        .devops-resize-handle-line {
            position: absolute;
            width: 1px;
            height: 100%;
            background-color: ${theme.colors.gray[3]};
        }

        &[data-separator="hover"],
        &[data-separator="drag"] {
            .devops-resize-handle-line {
                width: 3px;
                left: -1px;
                background-color: ${theme.colors.blue[5]};
            }
        }
    `;
};

interface Props {
    groupId?: string;
    left?: ReactNode;
    center?: ReactNode;
    right?: ReactNode;
    leftProps?: PanelProps;
    centerProps?: PanelProps;
    rightProps?: PanelProps;
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
    const handleCss = useHandleCss();

    const { defaultLayout, onLayoutChanged } = useDefaultLayout({
        groupId,
        storage: localStorage,
    });
    return (
        <Group defaultLayout={defaultLayout} onLayoutChange={onLayoutChanged}>
            {left && <Panel {...leftProps}>{left}</Panel>}
            {left && center && (
                <Separator className={handleCss}>
                    <div className="devops-resize-handle-line" />
                </Separator>
            )}
            {center && <Panel {...centerProps}>{center}</Panel>}
            {(left || center) && right && (
                <Separator className={handleCss}>
                    <div className="devops-resize-handle-line" />
                </Separator>
            )}
            {right && <Panel {...rightProps}>{right}</Panel>}
        </Group>
    );
};
