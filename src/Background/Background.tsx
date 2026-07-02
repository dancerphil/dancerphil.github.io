import { useState } from 'react';
import { backgrounds } from './backgrounds';
import c from './Background.module.css';

export const Background = () => {
    const [index, setIndex] = useState(0);

    return (
        <div
            className={c.background}
            style={{ backgroundImage: backgrounds[index] }}
            onClick={() => setIndex((index + 1) % backgrounds.length)}
        />
    );
};
