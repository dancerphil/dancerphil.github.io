import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@/components/MantineProvider';
import '@/styles';
import { Read } from './Read';

const root = createRoot(document.body);

root.render(
    <MantineProvider>
        <Read />
    </MantineProvider>,
);
