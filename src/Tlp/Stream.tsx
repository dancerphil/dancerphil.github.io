import { useEffect, useState } from 'react';
import { Button, Skeleton, Box } from '@mantine/core';
import { Markdown } from '@hero-u/mantine';
import { StreamParams, streamSentence } from '@/Tlp/utils';
import { useActiveNodeKey, getNodes, resetActiveNodeKey } from '@/Tlp/region';
import { responsive } from '@/Tlp/styles';

const handleClose = () => {
    resetActiveNodeKey();
    window.location.hash = '';
};

export const Stream = () => {
    const activeNodeKey = useActiveNodeKey();
    const [content, setContent] = useState<string>('');

    useEffect(
        () => {
            const asyncEffect = async () => {
                setContent('');

                const nodes = getNodes();
                const params: StreamParams = {};

                nodes?.forEach((node) => {
                    if (node.dataset.key === activeNodeKey) {
                        params['sentence'] = node.textContent || '';
                    }
                    if (node.dataset.key.startsWith(activeNodeKey) && node.dataset.key !== activeNodeKey) {
                        params['children'] = params['children'] || [];
                        params['children'].push(node.textContent || '');
                    }
                    if (node.dataset.key === activeNodeKey.slice(0, -1)) {
                        params['parent'] = node.textContent || '';
                    }
                });

                const { textStream } = streamSentence(params);

                for await (const textPart of textStream) {
                    setContent(v => v + textPart);
                }
            };

            asyncEffect();
        },
        [activeNodeKey],
    );

    return (
        <Box
            p={20}
            pos="sticky"
            top={0}
            h="100vh"
            style={{ fontSize: responsive.fontSizeSmall, lineHeight: 1.5, overflowY: 'auto' }}
        >
            <Button variant="default" onClick={handleClose}>× Close</Button>
            {content ? (
                <Markdown>{content}</Markdown>
            ) : <Skeleton height={200} />}
        </Box>
    );
};
