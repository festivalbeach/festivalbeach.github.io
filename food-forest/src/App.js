import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar.js'
import PlantInfo from './PlantInfo.js'
import Tabletop from 'tabletop';
import GoogleMapReact from 'google-map-react';
import Popup from "reactjs-popup";
import Switch from "react-switch"

class App extends Component {

  constructor() {
    super()
    this.state = {
      plantInfo: {},
      plantCoords: [],
      filtered: new Set()
    }
    this.updateFilters = this.updateFilters.bind(this)
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
          console.log(dat);
          info[dat['Label']] = dat;
        });
        console.log(info);
        console.log(coords);
        this.setState({plantInfo: info, plantCoords: coords});
      }
    });
  }

  updateFilters() {
    this.setState(({filtered}) => ({
      filtered: new Set().add('Peach')
    }));
  }

  static defaultProps = {
    center: {
      lat: 30.2534024,
      lng: -97.735288
    },
    zoom: 18
  };


  render() {
    if (Object.keys(this.state.plantInfo).length === 0) {
      return (<p>Loading...</p>);
    }
    else
      var plantInfo = this.state.plantInfo;
      var plantCoords = this.state.plantCoords;
      console.log(this.state.filtered.has('Peach'));
      console.log(this.state.filtered);
      return (
        <div className="App">
          <Navbar/>
          <header className="App-header">
            <button onClick={this.updateFilters}>Filter Peaches</button>
            <div id="map" style={{width: '100%', height: '90vh'}}>
              {/* <GoogleMapReact
                boostrapURLKeys={{key: 'AIzaSyBgw60HMTK35v3C-sRyLliDj6tNV-m2zlI'}}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                yesIWantToUseGoogleMapApiInternals
              > */}
              <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyBgw60HMTK35v3C-sRyLliDj6tNV-m2zlI'}} 
              defaultCenter={this.props.center} 
              defaultZoom={this.props.zoom} 
              options={function (maps) { return { mapTypeId: "satellite" } }} >
                {Object.keys(plantCoords).map((key, value) =>{
                  var point = plantCoords[key];
                  if (!this.state.filtered.has(point['Name'])) {
                    return <PlantInfo
                      plant={point['Name']}
                      lat={point['Latitude']}
                      lng={point['Longitude']}
                      plantInfoProp={plantInfo[point['Name']]}
                    />
                  }
                })}
              </GoogleMapReact>
            </div>
          </header>
        </div>
      );
  }
}

export default App;
