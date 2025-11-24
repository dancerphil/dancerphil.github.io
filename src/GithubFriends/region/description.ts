import { createRegion } from 'region-react';

const descriptionRegion = createRegion<string>('');

export const setDescription = descriptionRegion.set;

export const useDescription = descriptionRegion.useValue;
