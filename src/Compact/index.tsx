import { createRoot } from 'react-dom/client';
import '@/styles';
import '@/styles/simplePage';
// import '@/styles/dark';
import { Compact } from './Compact';

const root = createRoot(document.body);

root.render(<Compact />);
