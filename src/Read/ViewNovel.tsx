import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { UIEvent } from 'react';
import { Button, Group, Stack, Text } from '@mantine/core';
import { useElementSize, useMergedRef } from '@mantine/hooks';
import type { Novel } from './db';
import { ReadSettings } from './ReadSettings';
import { progressRegion, settingsRegion } from './region';
import c from './Read.module.css';

const PADDING = 16;

const findIndex = (offsets: number[], y: number) => {
    let low = 0;
    let high = offsets.length - 2;
    while (low < high) {
        const mid = (low + high + 1) >> 1;
        if (offsets[mid] <= y) {
            low = mid;
        }
        else {
            high = mid - 1;
        }
    }
    return low;
};

interface ViewNovelProps {
    novel: Novel;
    onBack: () => void;
}

export const ViewNovel = ({ novel, onBack }: ViewNovelProps) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const { ref: sizeRef, width, height } = useElementSize<HTMLDivElement>();
    const ref = useMergedRef(sizeRef, scrollerRef);
    const indexRef = useRef(progressRegion.get()[novel.id] ?? 0);
    const [scrollTop, setScrollTop] = useState(0);
    const { fontSize, lineHeight: lineHeightRatio, paragraphGap } = settingsRegion.useValue();

    const paragraphs = useMemo(
        () => novel.text.split(/\r?\n/).map(line => line.trim()).filter(Boolean),
        [novel.text],
    );

    const lineHeight = fontSize * lineHeightRatio;
    const charsPerLine = Math.max(1, Math.floor((width - PADDING * 2) / fontSize));

    const offsets = useMemo(() => {
        const result = [0];
        paragraphs.forEach((paragraph) => {
            const lines = Math.ceil(paragraph.length / charsPerLine);
            result.push(result.at(-1) + lines * lineHeight + paragraphGap);
        });
        return result;
    }, [paragraphs, charsPerLine, lineHeight, paragraphGap]);

    const total = offsets.at(-1);
    const index = findIndex(offsets, scrollTop);
    const start = index;
    const end = Math.min(paragraphs.length, findIndex(offsets, scrollTop + height) + 1);

    useLayoutEffect(() => {
        const el = scrollerRef.current;
        if (!el || !width) {
            return;
        }
        el.scrollTop = offsets[indexRef.current];
        setScrollTop(el.scrollTop);
    }, [offsets, width]);

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const top = e.currentTarget.scrollTop;
        setScrollTop(top);
        const next = findIndex(offsets, top);
        if (next !== indexRef.current) {
            indexRef.current = next;
            progressRegion.set(progress => ({ ...progress, [novel.id]: next }));
        }
    };

    return (
        <Stack h="100vh" maw={720} mx="auto" p="md" gap="sm">
            <Group justify="space-between">
                <Button variant="default" onClick={onBack}>返回</Button>
                <Text c="dimmed" truncate>{novel.name} · {Math.round(index / paragraphs.length * 100)}%</Text>
                <ReadSettings />
            </Group>
            <div ref={ref} className={c.scroller} onScroll={handleScroll}>
                <div
                    style={{
                        paddingTop: offsets[start],
                        paddingBottom: total - offsets[end],
                        paddingInline: PADDING,
                    }}
                >
                    {paragraphs.slice(start, end).map((paragraph, i) => (
                        <p
                            key={start + i}
                            className={c.paragraph}
                            style={{ fontSize, lineHeight: `${lineHeight}px`, paddingBottom: paragraphGap }}
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </Stack>
    );
};
