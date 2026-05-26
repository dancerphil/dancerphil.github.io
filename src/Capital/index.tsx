import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@/components/MantineProvider';
import '@/styles';
import { Capital } from './Capital';

const root = createRoot(document.body);

root.render(
    <MantineProvider>
        <Capital />
    </MantineProvider>,
);
