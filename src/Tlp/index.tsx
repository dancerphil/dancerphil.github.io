import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@/components/MantineProvider';
import '@/styles';
import { Tlp } from '@/Tlp/Tlp';

const root = createRoot(document.body);

root.render(
    <MantineProvider>
        <Tlp />
    </MantineProvider>,
);
