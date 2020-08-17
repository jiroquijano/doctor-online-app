import React from 'react';
import AppRouter from './routers/AppRouter';
import './App.css';
import useAxios from './customhooks/useAxios';

function App() {
 
  return (
    <div className="App">
      <AppRouter/>
    </div>
  );
}

export default App;
