import { createRegion } from 'region-react';

const region = createRegion<number>(0);

export const rerender = () => region.set(v => v + 1);

export const useRender = region.useValue;
