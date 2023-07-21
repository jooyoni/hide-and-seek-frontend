import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
