import { createRoot } from 'react-dom/client';
import { Markdown } from '@/components/Markdown';
import '@/styles';
import '@/styles/simplePage';
import './index.css';
import content from './async-await-cookbook.md?raw';

const root = createRoot(document.body);

root.render(<Markdown>{content}</Markdown>);
