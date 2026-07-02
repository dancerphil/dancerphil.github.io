import { ReactNode } from 'react';
import { Group, Panel, PanelProps, Separator, useDefaultLayout } from 'react-resizable-panels';
import c from './ResizeLayout.module.css';

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
    const { defaultLayout, onLayoutChanged } = useDefaultLayout({
        groupId,
        storage: localStorage,
    });
    return (
        <Group defaultLayout={defaultLayout} onLayoutChanged={onLayoutChanged}>
            {left && <Panel {...leftProps}>{left}</Panel>}
            {left && center && (
                <Separator className={c.handle}>
                    <div className="devops-resize-handle-line" />
                </Separator>
            )}
            {center && <Panel {...centerProps}>{center}</Panel>}
            {(left || center) && right && (
                <Separator className={c.handle}>
                    <div className="devops-resize-handle-line" />
                </Separator>
            )}
            {right && <Panel {...rightProps}>{right}</Panel>}
        </Group>
    );
};
