import { createRoot } from 'react-dom/client';
import '@/styles';
import '@/styles/simplePage';
import { CashFlow } from './CashFlow';

const root = createRoot(document.body);

root.render(<CashFlow />);
