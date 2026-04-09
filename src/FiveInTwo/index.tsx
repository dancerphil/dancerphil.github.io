import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@/styles';
import '@/styles/simplePage';
import { FiveInTwo } from './FiveInTwo';

const root = createRoot(document.body);

root.render(
    <MantineProvider>
        <FiveInTwo />
    </MantineProvider>,
);
