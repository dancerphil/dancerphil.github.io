import { createRegion } from 'region-react';

export const progressRegion = createRegion<Record<number, number>>({}, {
    withLocalStorageKey: 'read-progress',
});

export const settingsRegion = createRegion({ fontSize: 18, lineHeight: 1.9, paragraphGap: 8 }, {
    withLocalStorageKey: 'read-settings',
});
