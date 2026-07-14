import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@/components/MantineProvider';
import '@/styles';
import '@/styles/simplePage';
import { NameGenerator } from './NameGenerator';

const root = createRoot(document.body);

root.render(
    <MantineProvider defaultColorScheme="dark">
        <NameGenerator />
    </MantineProvider>,
);
