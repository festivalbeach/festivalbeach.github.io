import React, { Component } from 'react'
import './Filter.css'
import Tabletop from 'tabletop'
import Popup from "reactjs-popup"
import Switch from "react-switch"

class Filter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filterAll: true,
      filterEdibleFruit: false,
      filterEdibleSeed: false,
      filterSummer: false,
      filterWinter: false,
      filterFall: false,
      filterSpring: false
    }
    this.handleSwitch1 = this.handleSwitch1.bind(this)
    this.handleSwitch2 = this.handleSwitch2.bind(this)
    this.handleSwitch3 = this.handleSwitch3.bind(this)
    this.handleSwitch4 = this.handleSwitch4.bind(this)
    this.handleSwitch5 = this.handleSwitch5.bind(this)
    this.handleSwitch6 = this.handleSwitch6.bind(this)
    this.handleSwitch7 = this.handleSwitch7.bind(this)
  }

  handleSwitch1(filterAll) {
    this.setState({filterAll: filterAll}, this.refilter)
  }
  handleSwitch2(filterEdibleFruit) {
    this.setState({filterEdibleFruit: filterEdibleFruit}, this.refilter)
  }
  handleSwitch3(filterEdibleSeed) {
    this.setState({filterEdibleSeed: filterEdibleSeed}, this.refilter)
  }
  handleSwitch4(filterSpring) {
    this.setState({filterSpring: filterSpring}, this.refilter)
  }
  handleSwitch5(filterSummer){
    this.setState({filterSummer: filterSummer}, this.refilter)
  }
  handleSwitch6(filterFall) {
    this.setState({filterFall: filterFall}, this.refilter)
  }
  handleSwitch7(filterWinter) {
    this.setState({filterWinter: filterWinter}, this.refilter)
  }
  
  filterColumn(oneFilter, entry, columnName){
    if(entry[columnName] === 'FALSE'){
      oneFilter.add(entry['Label'])
    }
  }
  filterSeason(oneFilter, entry, season){
    if(season === entry['Harvest-able Season']){
      oneFilter.add(entry['Label'])
    }
  }
  intersection(filtered, oneFilter){
    return new Set([...filtered].filter(x => oneFilter.has(x)))
  }

  refilter() {
    var filtered = new Set()
    var fruit = new Set()
    var seed = new Set()
    // TODO remove comments after Harvest-able season has been added to spreadsheet
    // var spring = new Set()
    // var summer = new Set()
    // var fall = new Set()
    // var winter = new Set()
    var info = this.props.info
    
    Object.keys(info).map((key) => {
      //at least one filter is true or switch is on
      var filter = this.state.filterEdibleFruit || this.state.filterEdibleSeed
      if(!this.state.filterAll){
        filtered.add(info[key]['Label'])
        if(filter){
          if(this.state.filterEdibleFruit){
            this.filterColumn(fruit, info[key], 'Edible (fruit) Y/N')
          }
          if(this.state.filterEdibleSeed){
            this.filterColumn(seed, info[key], 'Edible Seed')
          }
          // TODO remove comments after Harvest-able season has been added to spreadsheet
          // if(this.state.filterSpring){
          //   this.filterColumn(spring, info[key])
          // }
          // if(this.state.filterSummer){
          //   this.filterColumn(summer, info[key])
          // }
          // if(this.state.filterFall){
          //   this.filterColumn(fall, info[key])
          // }
          // if(this.state.filterWinter){
          //   this.filterColumn(winter, info[key])
          // }
        }
      }
    })
    //intersection of all sets that are on
    //if all are off, filter all plants
    if(this.state.filterEdibleFruit){
      filtered = this.intersection(filtered, fruit)
    }
    if(this.state.filterEdibleSeed){
      filtered = this.intersection(filtered, seed)
    }
    // TODO remove comments after Harvest-able season has been added to spreadsheet
    // if(this.state.filterSpring){
    //   filtered = this.intersection(filtered, spring)
    // }
    // if(this.state.filterSummer){
    //   filtered = this.intersection(filtered, summer)
    // }
    // if(this.state.filterFall){
    //   filtered = this.intersection(filtered, fall)
    // }
    // if(this.state.filterWinter){
    //   filtered = this.intersection(filtered, winter)
    // }

    this.props.updateFilters(filtered)
  }


  /* Loads plant information and coordinates from a google spreadsheet.
   * info is stored as a map of name to information
   * plantCoords is stored as a list of {name, x, y} objects
   */



  render() {
    return (
      <div className="Filter">
        <header className="Filter-header">
          <Popup trigger={<button className="btn default" style={{color: 'white'}}> Filter </button>} modal-filter>
            {close => (
              <div className="modal-filter">
                <a className="close" onClick={close}>
                  &times
                </a>
                <div className="header"> Filters </div>

                <div class="grid-container">
                  <div class="item1">All</div>
                  <div class="item4"><Switch onChange={this.handleSwitch1} checked={this.state.filterAll} /></div>
                </div>

                <div class="grid-container">
                  <div class="item1">Edible Fruit</div>
                  <div class="item4"><Switch onChange={this.handleSwitch2} checked={this.state.filterEdibleFruit} /></div>
                </div>

                <div class="grid-container">
                  <div class="item1">Edible Seed</div>
                  <div class="item4"><Switch onChange={this.handleSwitch3} checked={this.state.filterEdibleSeed} /></div>
                </div>

                <div class="grid-container">
                  <div class="item1">Spring</div>
                  <div class="item4"><Switch onChange={this.handleSwitch4} checked={this.state.filterSpring} /></div>
                </div>

                <div class="grid-container">
                  <div class="item1">Summer</div>
                  <div class="item4"><Switch onChange={this.handleSwitch5} checked={this.state.filterSummer} /></div>
                </div>

                <div class="grid-container">
                  <div class="item1">Fall</div>
                  <div class="item4"><Switch onChange={this.handleSwitch6} checked={this.state.filterFall} /></div>
                </div>

                <div class="grid-containter">
                  <div class="item1">Winter</div>
                  <div class="item4"><Switch onChange={this.handleSwitch7} checked={this.state.filterWinter} /></div>
                </div>

              </div>
            )}
          </Popup>
        </header>
      </div>
    )

  }
}

export default Filter
