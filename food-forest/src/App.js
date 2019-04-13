import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tabletop from 'tabletop';
import Popup from "reactjs-popup";
import Switch from "react-switch"

class App extends Component {

  constructor() {
    super()
    this.state = {
      plantInfo: {},
      plantCoords: [],
      filterOne: true,
      filterTwo: true
    }
    this.handleSwitch1 = this.handleSwitch1.bind(this);
    this.handleSwitch2 = this.handleSwitch2.bind(this);
  }

  handleSwitch1(filterOne){
    this.setState({filterOne});
  }
  handleSwitch2(filterTwo){
    this.setState({filterTwo})
  }
  /* Loads plant information and coordinates from a google spreadsheet.
   * plantInfo is stored as a map of name to information
   * plantCoords is stored as a list of {name, x, y} objects
   */
  componentDidMount() {
    Tabletop.init({
      key: '1ecF8O2AxaI3DDI8A-o3B7zvzAeYYNU9HDvsshXAAmwc',
      callback: (junk, tabletop) => {
        let info = {};
        let coords = tabletop.sheets('Plant_Coordinates').all()
        tabletop.sheets('Plant_Details').all().forEach(dat => {
          info[dat['Label']] = dat;
        });
        this.setState({plantInfo: info, plantCoords: coords});
      }
    });
  }


  render() {
    if (Object.keys(this.state.plantInfo).length === 0) {
      return (<p>Loading...</p>);
    }
    else
      return (
        <div className="App">
          <header className="App-header">
            <Popup trigger={<button className="button"> Filter </button>} modal>
              {close => (
                <div className="modal">
                  <a className="close" onClick={close}>
                    &times;
                  </a>
                  <div className="header"> Filter Header </div>
                  <div className="content">
                    stuff
                  </div>
                  <div className="actions">
                    <div>
                      <label>
                      <span>Filter One</span>
                          <Switch onChange={this.handleSwitch1} checked={this.state.filterOne} />
                      </label>
                    </div>
                    <div>
                      <label>
                      <span>Filter Two</span>
                          <Switch onChange={this.handleSwitch2} checked={this.state.filterTwo} />
                      </label>
                    </div>
                    <button
                      className="button"
                      onClick={() => {
                        console.log('modal closed ')
                        close()
                      }}
                    >
                      Close Modal
                    </button>
                  </div>
                </div>
              )}
            </Popup>
            <img src={logo} className="App-logo" alt="logo" />

            {Object.keys(this.state.plantInfo).map((key, value) => (
              <p>Name:&nbsp;{key}&nbsp;&nbsp;&nbsp;Family:&nbsp;{this.state.plantInfo[key]['Family']}</p>
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
