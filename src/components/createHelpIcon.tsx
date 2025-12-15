import { ComponentType, forwardRef, ReactNode } from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { css, cx } from '@emotion/css';

export interface HelpIconProps {
    className?: string;
    tooltip?: ReactNode;
}

export interface HelpIconParams {
    Icon: ComponentType;
    className?: string;
}

const defaultCss = css`
    font-size: 16px;
    color: red;
    cursor: pointer;
`;

export const createHelpIcon = ({ Icon, className: defaultClassName }: HelpIconParams) => {
    const HelpIconInner = (props: HelpIconProps, ref: any) => {
        const { className, tooltip, ...rest } = props;
        const nextClassName = cx(defaultClassName, className);

        // @ts-expect-error
        const element = <Icon ref={ref} className={nextClassName} {...rest} />;

        if (!tooltip) {
            return element;
        }

        return (
            <Tooltip title={tooltip}>
                {element}
            </Tooltip>
        );
    };
    return forwardRef<unknown, HelpIconProps>(HelpIconInner);
};

export const HelpIcon = createHelpIcon({
    Icon: QuestionCircleOutlined,
    className: defaultCss,
});
