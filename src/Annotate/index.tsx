import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@/components/MantineProvider';
import '@/styles';
import { Annotate } from './Annotate';

const root = createRoot(document.body);

root.render(
    <MantineProvider>
        <Annotate />
    </MantineProvider>,
);
