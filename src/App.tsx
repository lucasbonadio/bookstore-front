import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { BookDetails } from './pages/BookDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/livro/:id" element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;