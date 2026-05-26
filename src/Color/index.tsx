import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@/components/MantineProvider';
import '@/styles';
import '@/styles/simplePage';
import { Color } from './Color';

const root = createRoot(document.body);

root.render(
    <MantineProvider>
        <Color />
    </MantineProvider>,
);
