import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@/styles';
import '@/styles/simplePage';
import { CashFlow } from './CashFlow';

const root = createRoot(document.body);

root.render(
    <MantineProvider>
        <CashFlow />
    </MantineProvider>,
);
