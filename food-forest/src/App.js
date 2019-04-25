import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar.js'
import PlantInfo from './PlantInfo.js'
import PersonMarker from './PersonMarker.js'
import Tabletop from 'tabletop';
import GoogleMapReact from 'google-map-react';
import { geolocated } from 'react-geolocated';

class App extends Component {

  constructor() {
    super()
    this.state = {
      plantInfo: [],
      filtered: new Set(),
      center: {
        lat: 30.2535,
        lng: -97.7350
      },
      zoom: 20
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
        if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords) {
          var lat = this.props.coords.latitude;
          var lng = this.props.coords.longitude;
          if (lat >= 30.2525 && lat <= 30.2535 && lng >= -97.736 && lng <= -97.734) {
            this.setState({center: {lat: lat, lng: lng}, zoom: 20});
          }
        }
        this.setState({plantInfo: tabletop.sheets('Plant_Information').all().filter(point => point['Label'].length > 0)});
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
    else {
      console.log(this.state.center.lat);
      console.log(this.state.center.lng);
      var plantInfo = this.state.plantInfo;
      var plantColor = null;
      return (
        <div className="App">
          <Navbar info={this.state.plantInfo} updateFilters={this.updateFilters.bind(this)}/>
          <header className="App-header">
            <div id="map" style={{width: '100%', height: '100vh'}}>
              <GoogleMapReact
                boostrapURLKeys={{key: 'AIzaSyBgw60HMTK35v3C-sRyLliDj6tNV-m2zlI'}}
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
                options={function (maps) { return { mapTypeId: "satellite", minZoom: 19, maxZoom: 20, restriction: {
                  latLngBounds: {
                    east: -97.734,
                    north: 30.2535,
                    south: 30.2525,
                    west: -97.736
                  },
                  strictBounds: true
                }}}}>
                {Object.keys(plantInfo).map((index) => {
                  if (plantInfo[index]['Toxicity (Rating: 1-4)'] !== undefined){
                    if (plantInfo[index]['Toxicity (Rating: 1-4)'] === "1 - Safe to eat. Enjoy!" ){
                      plantColor = "#93C054";
                    }
                    else if (plantInfo[index]['Toxicity (Rating: 1-4)'] === "2 - May need some processing."){
                      plantColor = "#F68D2E";
                    }
                    else {
                      plantColor = "#EE2737";
                    }
                  }
                  if (!this.state.filtered.has(plantInfo[index]['Label']) && plantInfo[index]['Latitude'] !== undefined && plantInfo[index]['Longitude'] !== undefined) {
                    return <PlantInfo
                      plant={plantInfo[index]['Label']}
                      lat={plantInfo[index]['Latitude']}
                      lng={plantInfo[index]['Longitude']}
                      color={plantColor}
                      plantInfoProp={plantInfo[index]}
                    />
                  }
                })}
                {this.props.coords !== null &&
                  <PersonMarker
                    lat={this.props.coords.latitude}
                    lng={this.props.coords.longitude}
                  />
                }
              </GoogleMapReact>
            </div>
          </header>
        </div>
      );
    }
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
