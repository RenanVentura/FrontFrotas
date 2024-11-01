import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Forms from './Pages/Formulario/Forms.jsx';
import ListaSolicitacao from './Pages/Home/home.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>  
    <Router>
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/solicitacao" element={<ListaSolicitacao />} />
      </Routes>
    </Router>
  </StrictMode>
);
