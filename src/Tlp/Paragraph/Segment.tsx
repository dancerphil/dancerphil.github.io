import { useMemo } from 'react';
import { Custom } from './Custom';
import { Footnote, Katex, KaiTi, Emphasis, Centered } from './Components';

interface SegmentProps {
    dataKey: string;
    node: HTMLElement;
}

export const Segment = ({ dataKey, node }: SegmentProps) => {
    return useMemo(
        () => {
            const { nodeName, textContent, childNodes } = node;
            switch (nodeName) {
                case 'emph':
                case 'i':
                    return <i style={{ border: '1px solid blue' }}>{textContent}</i>;
                case 'emphasis':
                    return <Emphasis>{textContent}</Emphasis>;
                case 'footnote':
                    return <Footnote>{textContent}</Footnote>;
                case 'katex':
                    return <Katex>{textContent}</Katex>;
                case 'kaiti':
                    return <KaiTi>{textContent}</KaiTi>;
                case 'centered': {
                    const children = [...childNodes].map((child, index) => (
                        <Segment key={index} dataKey={dataKey} node={child as HTMLElement} />
                    ));
                    return <Centered>{children}</Centered>;
                }
                case 'custom': {
                    return <Custom dataKey={dataKey} index={node.getAttribute('index')} language={node.getAttribute('language')} />;
                }
                case '#text':
                    return <>{textContent}</>;
                default:
                    console.warn(`Unknown node type: ${nodeName}`);
                    return <>{textContent}</>;
            }
        },
        [dataKey, node],
    );
};
