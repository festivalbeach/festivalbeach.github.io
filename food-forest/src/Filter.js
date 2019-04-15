import React, { Component } from 'react';
import './Filter.css'
import Tabletop from 'tabletop';
import Popup from "reactjs-popup";
import Switch from "react-switch"

class Filter extends Component {

  constructor() {
    super()
    this.state = {
      filterOne: true,
      filterTwo: true
    }
    this.handleSwitch1 = this.handleSwitch1.bind(this);
    this.handleSwitch2 = this.handleSwitch2.bind(this);
    this.handleSwitch3 = this.handleSwitch3.bind(this);
    this.handleSwitch4 = this.handleSwitch4.bind(this);
    this.handleSwitch5 = this.handleSwitch5.bind(this);
  }

  handleSwitch1(filterOne){
    this.setState({filterOne});
  }
  handleSwitch2(filterTwo){
    this.setState({filterTwo})
  }
  handleSwitch3(filterThree){
    this.setState({filterThree})
  }
  handleSwitch4(filterFour){
    this.setState({filterFour})
  }

  handleSwitch5(filterFive){
    this.setState({filterFive});
  }
  /* Loads plant information and coordinates from a google spreadsheet.
   * plantInfo is stored as a map of name to information
   * plantCoords is stored as a list of {name, x, y} objects
   */
	


  render() {
    return (
      <div className="Filter">
        <header className="Filter-header">
          <Popup trigger={<button class="btn default"> Filter </button>} modal-filter>
            {close => (
              <div className="modal-filter">
                <a className="close" onClick={close}>
                  &times;
                </a>
                <div className="header"> Filters </div>

                <div class="grid-container">
                  <div class="item1">Edibile</div>
                  <div class="item4"><Switch onChange={this.handleSwitch5} checked={this.state.filterFive} /></div>
                </div>

                <div class="grid-container">
                  <div class="item1">Summer</div>
                  <div class="item4"><Switch onChange={this.handleSwitch1} checked={this.state.filterOne} /></div>
                </div>

                <div class="grid-containter">  
                  <div class="item1">Winter</div>  
                  <div class="item4"><Switch onChange={this.handleSwitch2} checked={this.state.filterTwo} /></div>
                </div>

                <div class="grid-container">
                  <div class="item1">Fall</div>
                  <div class="item4"><Switch onChange={this.handleSwitch3} checked={this.state.filterThree} /></div>
                </div>

                <div class="grid-container">
                  <div class="item1">Spring</div>
                  <div class="item4"><Switch onChange={this.handleSwitch4} checked={this.state.filterFour} /></div>
                </div>



                {/* <div className="actions">
                  <div>
                    <label>
                        <Switch onChange={this.handleSwitch1} checked={this.state.filterOne} />
                    </label>
                  </div>
                  <div>
                    <label>
                    <span>Winter</span>
                        <Switch onChange={this.handleSwitch2} checked={this.state.filterTwo} />
                    </label>
                  </div>
                  <div>
                    <label>
                    <span>Fall</span>
                        <Switch onChange={this.handleSwitch3} checked={this.state.filterThree} />
                    </label>
                  </div>
                  <div>
                    <label>
                    <span>Winter</span>
                        <Switch onChange={this.handleSwitch4} checked={this.state.filterFour} />
                    </label>
                  </div>
                  
                </div> */}
              </div>
            )}
          </Popup>  
        </header>
      </div>
    );
     
  }
}

export default Filter;
