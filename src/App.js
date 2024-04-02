import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import AddCertificates from './pages/AddCertificate';

import Login from './pages/Login';

import { isMobile } from 'react-device-detect';
import Certificates from './pages/Certificate.jsx';


const App = () => {
  if (isMobile) {
    return (
      <div>
        <p>This website is only accessible on desktop devices.</p>
      </div>
    );
  }
  return (
   <>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/addCertificates' element={<AddCertificates />}/>
          <Route path='/certificates' element={<Certificates />} />
        </Routes>
     </>
  );
};

export default App;