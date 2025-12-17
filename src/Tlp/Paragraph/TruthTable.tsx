import styled from '@emotion/styled';
import { css, cx } from '@emotion/css';

const Grid = styled.div`
    display: grid;
`;

const Cell = styled.div`
    border-style: solid;
    border-color: #aaa;
    text-align: center;
    border-width: 0;
    width: 50px;
`;

const bt = css`
    border-top-width: 1px !important;
`;
const br = css`
    border-right-width: 1px !important;
`;
const bb = css`
    border-bottom-width: 1px !important;
`;
const bl = css`
    border-left-width: 1px !important;
`;

interface Props {
    row?: number;
    rowSeparate?: number;
    col: number;
    colSeparate?: number;
    values: string[];
}

export const TruthTable = ({ rowSeparate = 1, col, colSeparate = -1, values }: Props) => {
    const gridCss = css`grid-template-columns: repeat(${col}, 1fr);`;

    return (
        <Grid className={gridCss}>
            {values.map((value, index) => {
                const rowIndex = Math.floor(index / col);
                const colIndex = index % col;
                return (
                    <Cell
                        key={index}
                        className={cx(
                            rowIndex === rowSeparate ? cx('margin-top-2', bt) : '',
                            colIndex === colSeparate ? cx('margin-left-2', bl) : '',
                            colIndex === col - 1 ? '' : br,
                            bb,
                        )}
                    >
                        {value}
                    </Cell>
                );
            })}
        </Grid>
    );
};
