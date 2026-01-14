import { ComponentType } from 'react';
import {
    ActionIcon as MActionIcon,
    ActionIconProps as MActionIconProps,
    Button as MButton,
    ButtonProps as MButtonProps,
    PolymorphicComponentProps,
} from '@mantine/core';
import { IconHelp, IconProps } from '@tabler/icons-react';
import { withTooltip, WithTooltipExtraProps } from './withTooltip';

type ButtonProps = PolymorphicComponentProps<'button', MButtonProps & WithTooltipExtraProps>;

export const Button = withTooltip(MButton) as ComponentType<ButtonProps>;

type ActionIconProps = PolymorphicComponentProps<'button', MActionIconProps & WithTooltipExtraProps>;

export const ActionIcon = withTooltip(MActionIcon, { size: 32 }) as ComponentType<ActionIconProps>;

export const HelpIcon = withTooltip(IconHelp, { className: 'inline-flex size-4 text-gray-500 cursor-help' }) as ComponentType<IconProps & WithTooltipExtraProps>;
