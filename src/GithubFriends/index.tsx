import './index.css';
import { createRoot } from 'react-dom/client';
import { GithubFriends } from './GithubFriends';
// import '@/styles';

const root = createRoot(document.body);

root.render(<GithubFriends />);
