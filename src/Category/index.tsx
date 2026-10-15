import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@/components/MantineProvider';
import '@/styles';
import { Category } from '@/Category/Category';

const root = createRoot(document.body);

root.render(
    <MantineProvider>
        <Category />
    </MantineProvider>,
);
