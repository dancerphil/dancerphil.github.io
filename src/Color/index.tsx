import { createRoot } from 'react-dom/client';
import '@/styles';
import '@/styles/simplePage';
import { Color } from './Color';

const root = createRoot(document.body);

root.render(<Color />);
