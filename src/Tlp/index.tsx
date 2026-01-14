import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@/styles';
import { Tlp } from '@/Tlp/Tlp';

const root = createRoot(document.body);

root.render(
    <MantineProvider>
        <Tlp />
    </MantineProvider>,
);
