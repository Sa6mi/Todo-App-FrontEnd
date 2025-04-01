import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Menu } from './Components/Menu';
import { Route, Routes } from 'react-router';
import Dashboard from './Components/Routes/Dashboard';
import OpenTasks from './Components/Routes/OpenTasks';
import AllTasks from './Components/Routes/AllTasks';
import Settings from './Components/Routes/Settings';

function App() {
  return (
    <div className="App">
      <Menu/>
      <Routes>
        <Route path='/Login' element={<Login><Login/>}></Route>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/OpenTasks' element={<OpenTasks/>}/>
        <Route path='/AllTasks' element={<AllTasks/>}/>
        <Route path='/Settings' element={<Settings/>}/>
      </Routes>
    </div>
  );
}

export default App;