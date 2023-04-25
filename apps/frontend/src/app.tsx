import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/global';
import { defaultTheme } from './styles/theme';
import { Router } from './routes';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
        <ToastContainer />
      </BrowserRouter>

      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
