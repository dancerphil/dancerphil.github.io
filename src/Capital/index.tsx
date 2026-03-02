import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@/styles';
import { Capital } from './Capital';

const root = createRoot(document.body);

root.render(
    <MantineProvider>
        <Capital />
    </MantineProvider>,
);
