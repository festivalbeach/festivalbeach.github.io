import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar.js'
import PlantInfo from './PlantInfo.js'
import Tabletop from 'tabletop';
import GoogleMapReact from 'google-map-react';
import Popup from "reactjs-popup";
import Switch from "react-switch"
import { geolocated } from 'react-geolocated';

class App extends Component {

  constructor() {
    super()
    this.state = {
      plantInfo: {},
      filtered: new Set(),
      center: {
        lat: 30.2529,
        lng: -97.7350
      },
      zoom: 19
    }
  }

  /* Loads plant information and coordinates from a google spreadsheet.
   * plantInfo is stored as a map of name to information
   * plantCoords is stored as a list of {name, x, y} objects
   */
  componentDidMount() {
    Tabletop.init({
      key: '1_sQkoLJtMppKImYY5A7G06NqK1DrAZ9hGd596GKImFk',
      callback: (junk, tabletop) => {
        let info = {};
        tabletop.sheets('Plant_Information').all().forEach(dat => {
          info[dat['Label']] = dat;
        });
        if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords) {
          var lat = this.props.coords.latitude;
          var lng = this.props.coords.longitude;
          if (lat >= 30.2520 && lat <= 30.2535 && lng >= -97.7360 && lng <= -97.7340) {
            this.setState({center: {lat: this.props.coords.latitude, lng: this.props.coords.longitude}, zoom: 22});
          }
        }
        this.setState({plantInfo: info});
      }
    });
  }

  updateFilters(items) {
    this.setState({filtered: items});
  }

  render() {
    if (Object.keys(this.state.plantInfo).length === 0) {
      return (<p>Loading...</p>);
    }
    else
      var plantInfo = this.state.plantInfo;
      return (
        <div className="App">
          <Navbar info={this.state.plantInfo} updateFilters={this.updateFilters.bind(this)}/>
          <header className="App-header">
            <div id="map" style={{width: '100%', height: '90vh'}}>
              <GoogleMapReact
                boostrapURLKeys={{key: 'AIzaSyBgw60HMTK35v3C-sRyLliDj6tNV-m2zlI'}}
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
                options={function (maps) { return { mapTypeId: "satellite" } }}>
                {Object.keys(plantInfo).map((key, value) =>{
                  var point = plantInfo[key];
                  if (!this.state.filtered.has(point['Label']) && point['Latitude'] != undefined && point['Longitude'] != undefined) {
                    return <PlantInfo
                      plant={point['Label']}
                      lat={point['Latitude']}
                      lng={point['Longitude']}
                      plantInfoProp={point}
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

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
