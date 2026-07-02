import { createRoot } from 'react-dom/client';
import '@/styles';
import './index.css';
import { Background } from './Background';

const root = createRoot(document.body);

root.render(<Background />);
