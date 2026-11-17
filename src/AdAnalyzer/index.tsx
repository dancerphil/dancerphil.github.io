import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@/components/MantineProvider';
import '@/styles';
import '@/styles/simplePage';
import { AdAnalyzer } from './AdAnalyzer';

const root = createRoot(document.body);

root.render(
    <MantineProvider>
        <AdAnalyzer />
    </MantineProvider>,
);
