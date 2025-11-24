import { useRef } from 'react';
import { getBlockList } from '../region';
import { useRender } from '../renderer';
import Block from './Block';
import c from './Mine.module.css';
import { handleReset } from '../handlers';
import { panelStyle } from '../constant';
import { xyList } from '../utils';
import useEventListener from './useEventListener';
import CastRange from './CastRange';

export const Mine = () => {
    useRender();
    const ref = useRef<HTMLDivElement>(null);
    useEventListener(ref);

    const blockList = getBlockList();

    return (
        <>
            <div className={c.header} onMouseUp={handleReset} onTouchEnd={handleReset}>
                {blockList.filter(item => item.mine && !item.mark).length}
            </div>
            <div className={c.content}>
                <div
                    className={c.panel}
                    style={panelStyle}
                    ref={ref}
                >
                    {xyList.map((coordinate) => {
                        return (
                            <Block key={`${coordinate.x}-${coordinate.y}`} coordinate={coordinate} />
                        );
                    })}
                    <CastRange />
                </div>
            </div>
        </>
    );
};
