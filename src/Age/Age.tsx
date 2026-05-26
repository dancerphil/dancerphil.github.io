import { useState } from 'react';
import { createRegion } from 'region-react';
import { Center, Box } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useInterval, useForceUpdate } from '@mantine/hooks';

const birthRegion = createRegion<number>(undefined, {
    withLocalStorageKey: 'birth',
});

const View = () => {
    const forceUpdate = useForceUpdate();
    useInterval(forceUpdate, 100, { autoInvoke: true });
    const birth = birthRegion.useValue();
    const diff = ((Date.now() - birth) / 1000 / 31556926).toFixed(8);
    return (
        <Center
            style={{
                fontFamily: 'Monaco, monospace',
                fontSize: '120px',
            }}
        >
            {diff}
        </Center>
    );
};

export const Age = () => {
    const birth = birthRegion.useValue();
    const [date, setDate] = useState<string>();

    if (!birth) {
        return (
            <Box w={457} mx="auto">
                <DateTimePicker
                    value={date}
                    onChange={setDate}
                    placeholder="请选择出生日期"
                    submitButtonProps={{
                        onClick: () => {
                            if (date) {
                                birthRegion.set(new Date(date).getTime());
                            }
                        },
                    }}
                />
            </Box>
        );
    }
    return <View />;
};
