import { GrayToAlpha } from './GrayToAlpha';
import { ToOriginal } from './ToOriginal';

export const Color = () => {
    return (
        <>
            <h1>{'灰色 => 透明度'}</h1>
            <GrayToAlpha />
            <h1>{'彩色 + 透明度 => 原色'}</h1>
            <ToOriginal />
        </>
    );
};
