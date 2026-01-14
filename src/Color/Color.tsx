import { GrayToAlpha } from './GrayToAlpha';
import { ToOriginal } from './ToOriginal';
import { Title } from '@mantine/core';

export const Color = () => {
    return (
        <>
            <Title my="lg">{'灰色 => 透明度'}</Title>
            <GrayToAlpha />
            <Title my="lg">{'彩色 + 透明度 => 原色'}</Title>
            <ToOriginal />
        </>
    );
};
