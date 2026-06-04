import { codeFamily, pc } from '@/Tlp/styles';
import { Segment } from './Segment';
import c from './Paragraph.module.css';

const parser = new DOMParser();

const getNodes = (text: string) => {
    const document = parser.parseFromString(`<container>${text}</container>`, 'application/xml');
    return [...document.documentElement.childNodes];
};

interface Props {
    item: string[];
    cn: boolean;
    en: boolean;
    de: boolean;
}

export const Paragraph = ({ item, cn, en, de }: Props) => {
    const [dataKey, textCn, textEn, textDe] = item;

    return (
        <div className={c.container} data-key={dataKey ?? '0'} style={{ flexDirection: pc ? undefined : 'column' }}>
            <div className={c.key} style={{ fontFamily: codeFamily }}>
                {dataKey}
            </div>
            {cn && (
                <div className={c.content}>
                    {getNodes(textCn).map((node, index) => (
                        <Segment key={index} node={node as HTMLElement} dataKey={dataKey} />
                    ))}
                </div>
            )}
            {en && (
                <div className={c.content}>
                    {getNodes(textEn).map((node, index) => (
                        <Segment key={index} node={node as HTMLElement} dataKey={dataKey} />
                    ))}
                </div>
            )}
            {de && (
                <div className={c.content}>
                    {getNodes(textDe).map((node, index) => (
                        <Segment key={index} node={node as HTMLElement} dataKey={dataKey} />
                    ))}
                </div>
            )}
        </div>
    );
};
