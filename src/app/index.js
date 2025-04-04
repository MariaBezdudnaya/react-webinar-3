import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useSelector from '../store/use-selector';
import Main from './main';
import Basket from './basket';
import Info from './info';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
    <>
      <Routes>
        <Route path="/" element={<Main />} /> {/* Главная страница */}
        <Route path="/item/:id" element={<Info />} /> {/* Страница товара с динамическим id */}
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
    </BrowserRouter>
  );
}

export default App;
