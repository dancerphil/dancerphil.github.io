import { createRegion } from 'region-react';

const currentIdRegion = createRegion<string>();

export const getCurrentId = currentIdRegion.getValue;

export const useCurrentId = currentIdRegion.useValue;

export const setCurrentId = currentIdRegion.set;
