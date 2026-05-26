import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@/components/MantineProvider';
import '@/styles';
import { Home } from '@/Home/Home';

const root = createRoot(document.body);

root.render(
    <MantineProvider>
        <Home />
    </MantineProvider>,
);
