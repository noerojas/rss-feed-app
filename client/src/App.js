import React, { Component } from 'react';

import Header from './components/Header';
import Search from './components/Search';
import Footer from './components/Footer';

import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Search />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
