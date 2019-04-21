import React from 'react';
import Filter from './Filter.js'
import PlantInfo from './PlantInfo.js'
import Image from 'react-bootstrap/Image'
import logo from './foodforest_icon.PNG';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

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
        {/* style={{backgroundColor: '#696158'}} */}
        <Navbar color="faded" light expand="md" style={{backgroundColor: '#4B453F'}}>
	      <NavbarBrand href="/">
          <Image src= {logo} alt="Logo" style={{width:200}}fluid />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
	      <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
	            <NavItem>
	              <Filter info={this.props.info} updateFilters={this.props.updateFilters} style={{color: 'white'}}/>
	            </NavItem>
              <NavItem>
                <NavLink href="https://festivalbeach.org/" style={{color: 'white'}}>Food Forest Website</NavLink>
	            </NavItem>
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
	            <DropdownItem>
	              Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
	            <DropdownItem>
                  Reset
              </DropdownItem>
	        </DropdownMenu>
	      </UncontrolledDropdown> */}
	    </Nav>
	  </Collapse>
	</Navbar>
      </div>
    );
  }
}
