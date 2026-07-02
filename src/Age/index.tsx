import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@/components/MantineProvider';
import '@mantine/dates/styles.css';
import '@/styles';
import '@/styles/simplePage';
import { Age } from './Age';

const root = createRoot(document.body);

root.render(
    <MantineProvider defaultColorScheme="dark">
        <Age />
    </MantineProvider>,
);
