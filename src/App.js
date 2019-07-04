import React from 'react';
import './App.css';
import Gallery from './screen-components/gallery/gallery';
import LoginPage from './screen-components/login-page/loginPage';
import 'typeface-roboto';

function App() {
  return (
    <div className="App">
      <style>
        @import url('https://fonts.googleapis.com/css?family=Zilla+Slab:300,400&display=swap');
      </style>
      <LoginPage/>
    </div>
  );
}

export default App;
