import ReactDOM from 'react-dom/client';
import App from './app/page';
import { makeServer } from './server';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(<App />);

makeServer();
