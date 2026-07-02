import { createRoot } from 'react-dom/client';
import '@/styles';
import './index.css';
import { Maze } from './Maze';

const root = createRoot(document.body);

root.render(<Maze />);
