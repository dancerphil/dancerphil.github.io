import { createRoot } from 'react-dom/client';
import '@/styles';
import { initBlock } from './region';
import { Mine } from './components/Mine';

initBlock();

const root = createRoot(document.body);

root.render(<Mine />);
