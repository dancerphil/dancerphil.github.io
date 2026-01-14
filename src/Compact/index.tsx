import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@/styles';
import '@/styles/simplePage';
// import '@/styles/dark';
import { Compact } from './Compact';

const root = createRoot(document.body);

root.render(
    <MantineProvider>
        <Notifications />
        <Compact />
    </MantineProvider>,
);
