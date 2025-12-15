import { createRoot } from 'react-dom/client';
import '@/styles';
import '@/styles/verticalCentered';
import '@/styles/dark';
import { Age } from './Age';

const root = createRoot(document.body);

root.render(<Age />);
