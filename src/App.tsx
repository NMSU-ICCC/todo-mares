import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Components/Main';
import bg from './Assets/background.jpg';

function App() {
  console.log(`url(${bg})`)
  return (
    <div className="App" style={{backgroundImage:  `url(${bg})`, backgroundSize: "cover" }}>
      <Main/>
    </div>
  );
}

export default App;
