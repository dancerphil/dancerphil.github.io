import { ComponentType, forwardRef, ReactNode } from 'react';
import { Tooltip } from '@mantine/core';

function cn(...classes: unknown[]) {
    return classes
        .flat()
        .filter(Boolean)
        .join(' ')
        .trim();
}

export interface WithTooltipExtraProps {
    tooltip?: ReactNode;
    disabledReason?: ReactNode;
}

export function withTooltip<T>(ComponentIn: ComponentType<T> | any, defaultProps?: Partial<T>) {
    const {
        className: defaultClassName,
        tooltip: defaultTooltip,
        disabledReason: defaultDisabledReason,
        ...defaultRest
    } = (defaultProps as any) ?? {};

    const ComponentInner = (props: any, ref: any) => {
        const { className, tooltip = defaultTooltip, disabledReason = defaultDisabledReason, ...rest } = props;
        const nextClassName = cn(defaultClassName, className);
        const nextProps = { className: nextClassName, ...defaultRest, ...rest };

        const element = <ComponentIn ref={ref} {...nextProps} />;

        if (nextProps.disabled && disabledReason) {
            return (
                <Tooltip label={disabledReason}>
                    <span>{element}</span>
                </Tooltip>
            );
        }

        if (tooltip) {
            return (
                <Tooltip label={tooltip}>
                    {element}
                </Tooltip>
            );
        }
        return element;
    };

    const ComponentOut = forwardRef(ComponentInner);
    return ComponentOut as any as ComponentType<T & WithTooltipExtraProps>;
}
