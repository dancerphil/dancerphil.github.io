import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@/styles';
import '@/styles/simplePage';
import { Color } from './Color';

const root = createRoot(document.body);

root.render(
    <MantineProvider>
        <Color />
    </MantineProvider>,
);
