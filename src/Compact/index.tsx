import { createRoot } from 'react-dom/client';
import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@/components/MantineProvider';
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
