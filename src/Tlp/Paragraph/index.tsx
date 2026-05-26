import { codeFamily, responsive } from '@/Tlp/styles';
import { Segment } from './Segment';
import { Footnote } from './Components';
import c from './Paragraph.module.css';

const tip = <Footnote>标记各个命题的十进数表明这些命题的逻辑重要性和在我的叙述中对它们的强调。命题 n.1，n.2，n.3 等等是对命题 n 的评述；命题 n.m1，n.m2 等等是对命题 n.m 的评述；余类推。</Footnote>;

const parser = new DOMParser();

interface Props {
    item: string;
}

export const Paragraph = ({ item }: Props) => {
    const [dataKey, content] = item.split('\t');

    const document = parser.parseFromString(`<container>${content}</container>`, 'application/xml');

    return (
        <div className={c.container} data-key={dataKey ?? '0'}>
            <div className={c.key} style={{ width: responsive.keyWidth, fontFamily: codeFamily }}>
                {dataKey}
                {dataKey === '1' && tip}
            </div>
            <div>{[...document.documentElement.childNodes].map((node, index) => (
                <Segment key={index} node={node as HTMLElement} dataKey={dataKey} />
            ))}
            </div>
        </div>
    );
};
