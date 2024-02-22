import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import LandingPage from './components/landingPage/LandingPage';
import HomePage from './components/homePage/HomePage';
import Detail from './components/detail/Detail';
import FormPage from './components/formPage/FormPage';
import Error404 from './components/error404/Error404';

export default function App() {
  return (
    <div className='App'>
     
      <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/detail/:id' id='' element={<Detail/>}/>
          <Route path='/form' element={<FormPage/>}/>
          <Route path="*" element={<Error404/>}/> 
      </Routes> 
    </div>
  );
}

