import React, { useEffect } from 'react';
import { Routes } from './Routes/routes';

const App = () => {
  useEffect(() => {
    console.log(window.location.pathname);
  }, []);
  return (
    <div>
      <Routes />
    </div>
  );
};

export default App;
