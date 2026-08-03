import { MantineProvider as MantineProviderBase, createTheme, v8CssVariablesResolver } from '@mantine/core';
import type { MantineProviderProps } from '@mantine/core';
import { themeOverride } from '@hero-u/mantine';
import '@mantine/core/styles.css';

const theme = createTheme(themeOverride);

export const MantineProvider = (props: MantineProviderProps) => {
    return (
        <MantineProviderBase
            cssVariablesResolver={v8CssVariablesResolver}
            theme={theme}
            {...props}
        />
    );
};
