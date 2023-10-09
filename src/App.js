import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Viewer from './Pages/Viewer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/viewer" element={<Viewer />}/>
        <Route path="*" element={<h1>Not Found 404</h1>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
