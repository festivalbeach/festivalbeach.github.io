import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tabletop from 'tabletop';

class App extends Component {

  constructor() {
    super()
    this.state = {
      plantInfo: {}
    }
  }

  // Loads plant info on initialization into a map of name to object
  componentDidMount() {
    Tabletop.init({
      key: '1ecF8O2AxaI3DDI8A-o3B7zvzAeYYNU9HDvsshXAAmwc',
      callback: data => {
        let info = {};
        data.forEach(dat => {
          info[dat['Label']] = dat;
        });
        this.setState({plantInfo: info});
      },
      simpleSheet: true
    })
  }


  render() {
    if (Object.keys(this.state.plantInfo).length === 0) {
      return (<p>Loading...</p>);
    }
    else
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />

            {Object.keys(this.state.plantInfo).map((key, value) => (
              <p>Name:{key}    Family:{this.state.plantInfo[key]['Family']}</p>
            ))}
            {this.state.plantInfo['Peach']['Label']}

            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
  }
}

export default App;
