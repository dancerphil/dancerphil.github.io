import { createRoot } from 'react-dom/client';
import '@/styles';
import { Annotate } from './Annotate';

const root = createRoot(document.body);

root.render(<Annotate />);
