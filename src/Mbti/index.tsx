import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@/styles';
import { Mbti } from '@/Mbti/Mbti';

const root = createRoot(document.body);

root.render(
    <MantineProvider>
        <Mbti />
    </MantineProvider>,
);
