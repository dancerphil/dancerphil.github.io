import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@/styles';
import '@/styles/simplePage';
import '@/styles/dark';
import { Age } from './Age';

const root = createRoot(document.body);

root.render(
    <MantineProvider defaultColorScheme="dark">
        <Age />
    </MantineProvider>,
);
