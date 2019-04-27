import React, { Component } from 'react'
import './Filter.css'
import Popup from "reactjs-popup"
import Switch from "react-switch"
import { Container, Row, Col } from 'reactstrap';
// import Container from 'react-bootstrap/Container'
// import Tabletop from 'tabletop'

class Filter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filterEdibleFruit: false,
      filterEdibleSeed: false,
      filterSummer: false,
      filterWinter: false,
      filterFall: false,
      filterSpring: false
    }
    this.handleSwitch2 = this.handleSwitch2.bind(this)
    this.handleSwitch3 = this.handleSwitch3.bind(this)
    this.handleSwitch4 = this.handleSwitch4.bind(this)
    this.handleSwitch5 = this.handleSwitch5.bind(this)
    this.handleSwitch6 = this.handleSwitch6.bind(this)
    this.handleSwitch7 = this.handleSwitch7.bind(this)
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
    if(season !== entry['Harvest Start'] && season !== entry['Harvest End']){
      oneFilter.add(entry['Label'])
    }
  }
  intersection(filtered, oneFilter){
    return new Set([...filtered].filter(x => oneFilter.has(x)))
  }
  union(oneFilter, twoFilter){
    return new Set([...oneFilter, ...twoFilter])
  }

  refilter() {
    var filtered = new Set()
    var fruit = new Set()
    var seed = new Set()
    var spring = new Set()
    var summer = new Set()
    var fall = new Set()
    var winter = new Set()
    var info = this.props.info

    Object.keys(info).map((key) => {
      //at least one filter is true or switch is on
      //if one of the edible or at least one of the seasons
      if (this.state.filterEdibleFruit || this.state.filterEdibleSeed || this.state.filterSpring || this.state.filterSummer || this.state.filterFall || this.state.filterWinter){
        filtered.add(info[key]['Label'])
        if(this.state.filterEdibleFruit){
          this.filterColumn(fruit, info[key], 'Edible (fruit) Y/N')
        }
        if(this.state.filterEdibleSeed){
          this.filterColumn(seed, info[key], 'Edible Seed')
        }
        if(this.state.filterSpring){
          this.filterSeason(spring, info[key], 'Spring')
        }
        if(this.state.filterSummer){
          this.filterSeason(summer, info[key], 'Summer')
        }
        if(this.state.filterFall){
          this.filterSeason(fall, info[key], 'Winter')
        }
        if(this.state.filterWinter){
          this.filterSeason(winter, info[key], 'Fall')
        }
      }
    })
  //intersection of all sets that are on
  // if(this.state.filterEdibleFruit){
  //   filtered = this.intersection(filtered, fruit)
  // }
  // if(this.state.filterEdibleSeed){
  //   filtered = this.intersection(filtered, seed)
  // }
  var edible = new Set()
  if(this.state.filterEdibleFruit && this.state.filterEdibleSeed){
    edible = this.union(fruit, seed)
  }
  else if(this.state.filterEdibleFruit){
    edible = fruit
  }
  else if(this.state.filterEdibleSeed){
    edible = seed
  }
  if(this.state.filterSpring){
    filtered = this.intersection(filtered, spring)
  }
  if(this.state.filterSummer){
    filtered = this.intersection(filtered, summer)
  }
  if(this.state.filterFall){
    filtered = this.intersection(filtered, fall)
  }
  if(this.state.filterWinter){
    filtered = this.intersection(filtered, winter)
  }
  if(this.state.filterSpring || this.state.filterSummer || this.state.filterFall || this.state.filterWinter && edible.size != 0){
    filtered = this.union(filtered, edible)
  }
  else{
    filtered = edible
  }
  
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
          <Popup 
            trigger={<button className="btn default" style={{color: 'white'}}> Filter </button>}
            position='bottom right' 
            modal-filter
          >
            {close => (
              <div className="modal-filter">
                <a className="close" onClick={close}>
                  &times;
                </a>
                <div className="header"> Filters </div>
                <div className="grid-container">
                <Container>
                <div class = "Filter-header-header">Edibility</div>
                  <Row className="justify-content-md-center">
                    <Col><div className="item1">Fruit</div></Col>
                    <Col>
                      <div className="item4"><Switch onChange={this.handleSwitch2} checked={this.state.filterEdibleFruit} /></div>
                    </Col>
                  </Row>
                  <Row className="justify-content-md-center">
                    <Col><div className="item1">Seed</div></Col>
                    <Col>
                      <div className="item4"><Switch onChange={this.handleSwitch3} checked={this.state.filterEdibleSeed} /></div>
                    </Col>
                  </Row>
                  <div className = "season-filters">
                    <div className = "Filter-header-header">Harvest Season</div>
                    <Row className="justify-content-md-center">
                      <Col>Spring</Col>
                      <Col>
                        <div className="item4"><Switch onChange={this.handleSwitch4} checked={this.state.filterSpring} /></div>
                      </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                      <Col>Summer</Col>
                      <Col>
                        <div className="item4"><Switch onChange={this.handleSwitch5} checked={this.state.filterSummer} /></div>
                      </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                      <Col>Fall</Col>
                      <Col>
                        <div className="item4"><Switch onChange={this.handleSwitch6} checked={this.state.filterFall} /></div>
                      </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                      <Col>Winter</Col>
                      <Col>
                        <div className="item4"><Switch onChange={this.handleSwitch7} checked={this.state.filterWinter} /></div>
                      </Col>
                    </Row>
                  </div>
                </Container>
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
