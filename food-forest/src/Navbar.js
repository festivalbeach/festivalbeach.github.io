import React from 'react';
import Filter from './Filter.js';
import Searchbar from './Searchbar.js';
import Image from 'react-bootstrap/Image';
import logo from './foodforest_icon.PNG';
import './Navbar.css';


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
          <Navbar color="faded" light expand="sm" style={{backgroundColor: '#4B453F'}}>
          <NavbarBrand href="/">
            <Image src= {logo} alt="Logo" style={{width:200}} />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Nav className= "Navbar-content" navbar>
                <NavItem>
                  <Filter info={this.props.info} updateFilters={this.props.updateFilters} style={{color: 'white'}} />
                </NavItem>
                <NavItem>
                  <NavLink href="https://festivalbeach.org/" style={{color: 'white'}} >Festival Beach Website</NavLink>
                </NavItem>
                <NavItem>
                  <Searchbar/>
                </NavItem>
              </Nav>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
