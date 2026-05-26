import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@/components/MantineProvider';
import '@/styles';
import { Mbti } from '@/Mbti/Mbti';

const root = createRoot(document.body);

root.render(
    <MantineProvider>
        <Mbti />
    </MantineProvider>,
);
