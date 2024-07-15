import React from 'react';
import Contacts from './Components/Contacts';
import Navbar from './Components/Navbar';
import CreateContact from './Components/CreateContact';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Contact from './Components/Contact';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <Router>
    <div>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/home' element={<Contacts/>}/>
        <Route path='/create' element={<CreateContact/>}/>
        <Route path='/home/:id' element={<Contact/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
