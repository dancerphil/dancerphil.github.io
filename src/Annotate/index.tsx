import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@/styles';
import { Annotate } from './Annotate';

const root = createRoot(document.body);

root.render(
    <MantineProvider>
        <Annotate />
    </MantineProvider>,
);
