import { useState } from 'react';
import { Button, Group, Stack, Text, TextInput } from '@mantine/core';
import type { Novel } from './db';

interface ListNovelProps {
    novels: Novel[];
    onOpen: (id: number) => void;
    onRename: (novel: Novel, name: string) => void;
}

export const ListNovel = ({ novels, onOpen, onRename }: ListNovelProps) => {
    const [editingId, setEditingId] = useState<number>();
    const [draft, setDraft] = useState('');

    const commit = (novel: Novel) => {
        const name = draft.trim();
        setEditingId(undefined);
        if (name && name !== novel.name) {
            onRename(novel, name);
        }
    };

    return (
        <Stack>
            {novels.map(novel => (
                <Group key={novel.id} justify="space-between">
                    {editingId === novel.id ? (
                        <TextInput
                            autoFocus
                            value={draft}
                            onChange={e => setDraft(e.currentTarget.value)}
                            onBlur={() => commit(novel)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.currentTarget.blur();
                                }
                            }}
                        />
                    ) : (
                        <Text>{novel.name}</Text>
                    )}
                    <Group>
                        <Button
                            variant="default"
                            onClick={() => {
                                setEditingId(novel.id);
                                setDraft(novel.name);
                            }}
                        >
                            改名
                        </Button>
                        <Button onClick={() => onOpen(novel.id)}>打开</Button>
                    </Group>
                </Group>
            ))}
        </Stack>
    );
};
