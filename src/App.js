import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './page/home';
import Information from './page/information';
// Define your routes
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/information" element={<Information />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;