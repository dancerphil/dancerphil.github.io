import { useEffect, useState } from 'react';
import { Button, FileButton, Group, Stack, Text } from '@mantine/core';
import { addNovel, listNovels, putNovel } from './db';
import type { Novel } from './db';
import { ListNovel } from './ListNovel';
import { ViewNovel } from './ViewNovel';

const decode = async (file: File) => {
    const buffer = await file.arrayBuffer();
    try {
        return new TextDecoder('utf-8', { fatal: true }).decode(buffer);
    }
    catch {
        return new TextDecoder('gbk').decode(buffer);
    }
};

export const Read = () => {
    const [novels, setNovels] = useState<Novel[]>([]);
    const [openId, setOpenId] = useState<number>();

    useEffect(() => {
        const load = async () => {
            setNovels(await listNovels());
        };
        load();
    }, []);

    const handleFile = async (file: File) => {
        const novel = { name: file.name, text: await decode(file) };
        const id = await addNovel(novel);
        setNovels(prev => [...prev, { ...novel, id }]);
    };

    const handleRename = async (novel: Novel, name: string) => {
        const renamed = { ...novel, name };
        await putNovel(renamed);
        setNovels(prev => prev.map(item => (item.id === novel.id ? renamed : item)));
    };

    const openNovel = novels.find(novel => novel.id === openId);

    if (openNovel) {
        return <ViewNovel key={openNovel.id} novel={openNovel} onBack={() => setOpenId(undefined)} />;
    }

    return (
        <Stack maw={720} mx="auto" p="md">
            <Group justify="space-between">
                <Text fw={600}>我的小说</Text>
                <FileButton accept="text/plain" onChange={handleFile}>
                    {props => <Button {...props}>上传小说</Button>}
                </FileButton>
            </Group>
            <ListNovel novels={novels} onOpen={setOpenId} onRename={handleRename} />
        </Stack>
    );
};
