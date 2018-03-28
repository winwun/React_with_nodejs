import React, { Component } from 'react';
import './App.css';
import Routes from './routes'


class App extends Component {
  state = {
    response: ''
  };

  render() {
    return (
      <div className="App">
       <Routes/>
      </div>
    );
  }
}

export default App;