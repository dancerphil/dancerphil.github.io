import { Title, Box, Anchor } from '@mantine/core';
import { CoverInfo } from './types';

interface Props {
    cover: CoverInfo;
}

export const Cover = ({ cover }: Props) => {
    const { source, title, author, translator, flex } = cover;
    const isLink = source && /^https?:\/\//.test(source);
    return (
        <Box flex={flex}>
            {source && (
                isLink
                    ? <h3><Anchor href={source} c="white" td="underline">{source}</Anchor></h3>
                    : <h3>{source}</h3>
            )}
            <Title order={1} fz={50}>{title}</Title>
            <h2>{author}</h2>
            {translator && <h2>{translator}</h2>}
        </Box>
    );
};
