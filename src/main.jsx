
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './default-data/DefaultGlobalData';
import './index.css';
import ScrollToTop from './features/ScrollToTop';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalProvider>
      <ScrollToTop />
      <App />
    </GlobalProvider>
  </BrowserRouter>
);