import App from './app';
import Store from './store';
import { createRoot } from 'react-dom/client';
import { StoreContext } from './store/context';
import { LangProvider } from './lang/LangContext';
import 'theme.css';


const store = new Store();
const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <LangProvider>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </LangProvider>,
);