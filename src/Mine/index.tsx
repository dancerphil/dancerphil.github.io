import { createRoot } from 'react-dom/client';
import '@/styles';
import { Mine } from './components/Mine';

const root = createRoot(document.body);

root.render(<Mine />);
