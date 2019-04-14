import React, { Component } from 'react';
import './Filter.css'
import Tabletop from 'tabletop';
import Popup from "reactjs-popup";
import Switch from "react-switch"

class Filter extends Component {

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
    return (
      <div className="Filter">
        <header className="Filter-header">
          <Popup trigger={<button type="button" class="btn-secondary"> Filter </button>} modal-filter>
            {close => (
              <div className="modal-filter">
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
        </header>
      </div>
    );
     
  }
}

export default Filter;
