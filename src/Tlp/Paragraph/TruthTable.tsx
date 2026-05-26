import c from './TruthTable.module.css';

interface Props {
    row?: number;
    rowSeparate?: number;
    col: number;
    colSeparate?: number;
    values: string[];
}

export const TruthTable = ({ rowSeparate = 1, col, colSeparate = -1, values }: Props) => {
    const columnStyle: Record<string, string> = {
        gridTemplateColumns: `repeat(${col}, 1fr)`,
    };

    return (
        <div className={c.grid} style={columnStyle}>
            {values.map((value, index) => {
                const rowIndex = Math.floor(index / col);
                const colIndex = index % col;
                return (
                    <div
                        key={index}
                        className={[
                            c.cell,
                            rowIndex === rowSeparate ? c.bt : '',
                            colIndex === colSeparate ? c.bl : '',
                            colIndex === col - 1 ? '' : c.br,
                            c.bb,
                        ].join(' ')}
                    >
                        {value}
                    </div>
                );
            })}
        </div>
    );
};
