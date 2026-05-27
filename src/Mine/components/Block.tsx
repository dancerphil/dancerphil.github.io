import { useBlock } from '../region';
import { blockStyle as style } from '../constant';
import { Coordinate } from '../types';
import theme from './Theme2.module.css';
import styles from './Block.module.css';

interface Props {
    coordinate: Coordinate;
}

export const Block = ({ coordinate }: Props) => {
    const block = useBlock(coordinate);

    if (!block) {
        return null;
    }

    const { mine, reveal, mark, label } = block;

    if (!reveal) {
        const className = [
            styles.block,
            theme.cover,
            mark ? theme.mark : '',
        ].filter(Boolean).join(' ');
        return (
            <div
                className={className}
                style={style}
            >
                {mark && 'm'}
            </div>
        );
    }
    const className = [
        styles.block,
        theme.reveal,
        !mine ? theme[`label${label}`] : '',
        mine ? theme.mine : '',
    ].filter(Boolean).join(' ');
    return (
        <div
            className={className}
            style={style}
        >
            {mine ? '!' : label}
        </div>
    );
};
