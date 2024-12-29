import React from 'react';
import {Routes, Route} from 'react-router-dom'

import LoginPage from './components/loginpage/loginPage';
import Dashboard from './components/dashboard/dashboard';
import RegisterPage from './components/register/registerPage';

const App = () => {
  // return <LoginPage />;
  return (
    <div className='App'>
      <Routes>
        <Route path='' element= {<LoginPage />}></Route>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/register/*" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default App;
