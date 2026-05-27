import { ComponentType, ReactNode } from 'react';
import {
    ActionIcon as MActionIcon,
    ActionIconProps as MActionIconProps,
    Button as MButton,
    ButtonProps as MButtonProps,
} from '@mantine/core';
import { IconHelp, IconProps } from '@tabler/icons-react';
import { withTooltip } from '@hero-u/mantine';

interface WithTooltipExtraProps {
    tooltip?: ReactNode;
    disabledReason?: ReactNode;
}

export const Button = withTooltip<MButtonProps>(MButton);

export const ActionIcon = withTooltip<MActionIconProps>(MActionIcon, { size: 32 });

export const HelpIcon = withTooltip(IconHelp, {
    size: 16,
    style: { display: 'inline-flex', cursor: 'help', color: 'var(--mantine-color-gray-6)' },
}) as ComponentType<IconProps & WithTooltipExtraProps>;
