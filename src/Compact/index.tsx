import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@/components/MantineProvider';
import { Notifications } from '@mantine/notifications';
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
