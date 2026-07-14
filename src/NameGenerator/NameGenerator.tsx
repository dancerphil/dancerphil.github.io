import { createRegion } from 'region-react';
import { Box, Button, Center, Group, Badge, Stack } from '@mantine/core';
import { adjectives, nouns } from './words';

const namesRegion = createRegion<string[]>([]);

const generateNames = () => {
    const names = Array.from({ length: 12 }, () => {
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        return `${adjective}${noun}`;
    });
    namesRegion.set(names);
};

export const NameGenerator = () => {
    const names = namesRegion.useValue();
    return (
        <Center>
            <Stack align="center" gap="lg">
                <Button onClick={generateNames}>批量生成</Button>
                <Box maw={600}>
                    <Group justify="center" gap="sm">
                        {names.map((name, index) => (
                            <Badge key={index} size="lg" variant="light">
                                {name}
                            </Badge>
                        ))}
                    </Group>
                </Box>
            </Stack>
        </Center>
    );
};
