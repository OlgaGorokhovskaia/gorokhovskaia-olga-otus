import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './routes/home';
import City from './routes/city';
import NotFound from './routes/notFound';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/city" element={<City />} />
      <Route path="*" element={<NotFound />}/>
    </Routes>
  </BrowserRouter>
);
