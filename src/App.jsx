import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import AddWine from './components/addWine';
import ListOfWines from './components/wineList';
import EditWine from './components/editWine';
import Login from './components/login';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/add" element={<AddWine />} />
      <Route path="/list" element={<ListOfWines />} />
      <Route path="/edit/:id" element={<EditWine />} />
      <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;