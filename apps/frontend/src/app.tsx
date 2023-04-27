import './styles.css';

import { BrowserRouter } from 'react-router-dom';
import Router from './routes';

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
