import { useEffect, useState } from 'react';
import { createRegion } from 'region-react';
import { css } from '@emotion/css';
import { DatePicker } from '@/components/DatePicker';
import { width } from '@panda-design/components';

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

export const useLoopRerender = () => {
    const [, setTick] = useState(0);

    useEffect(
        () => {
            const timer = setInterval(() => {
                setTick(tick => tick + 1);
            }, 100);
            return () => clearInterval(timer);
        },
        [],
    );
};

const View = () => {
    useLoopRerender();
    const birth = birthRegion.useValue();
    // eslint-disable-next-line react-hooks/purity
    const diff = ((Date.now() - birth) / 1000 / 31556926).toFixed(8);
    return (
        <div className={containerCss}>
            {diff}
        </div>
    );
};

export const Age = () => {
    const birth = birthRegion.useValue();
    if (!birth) {
        return (
            <DatePicker
                showTime
                className={width(457)}
                onChange={(date) => {
                    if (date) {
                        birthRegion.set(date.getTime());
                    }
                }}
                placeholder="请选择出生日期"
            />
        );
    }
    return <View />;
};
