import React from 'react';
import ReactDOM from 'react-dom';
import LoginP from './components/Login';
import RegisterP from './components/Register';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Board from './components/home';
import SearchP from './components/search';
import WishP from './components/wishlist';

export default function App() {
  return(
  <Router>
    <Routes>
      <Route path="/login" element={<LoginP/>} />
      <Route path="/register" element={<RegisterP/>} />
      <Route path="/home" element={<Board/>} />
      <Route path="/search" element={<SearchP/>} />
    </Routes>
  </Router>
  )
}