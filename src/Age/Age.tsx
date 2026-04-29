import { useState } from 'react';
import { createRegion } from 'region-react';
import { css } from '@emotion/css';
import { DateTimePicker } from '@mantine/dates';
import { useInterval, useForceUpdate } from '@mantine/hooks';

const birthRegion = createRegion<number>(undefined, {
    withLocalStorageKey: 'birth',
});

const containerCss = css`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Monaco', monospace;
    font-size: 120px;
`;

const View = () => {
    const forceUpdate = useForceUpdate();
    useInterval(forceUpdate, 100, { autoInvoke: true });
    const birth = birthRegion.useValue();
    // eslint-disable-next-line react-hooks/purity
    const diff = ((Date.now() - birth) / 1000 / 31556926).toFixed(8);
    return (
        <div className={containerCss}>
            {diff}
        </div>
    );
};

const datePickerCss = css`
    width: 457px;
    margin: 0 auto;
`;

export const Age = () => {
    const birth = birthRegion.useValue();
    const [date, setDate] = useState<string>();

    if (!birth) {
        return (
            <DateTimePicker
                className={datePickerCss}
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
        );
    }
    return <View />;
};
