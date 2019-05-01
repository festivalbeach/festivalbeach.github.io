import React from 'react';
import Filter from './Filter.js';
import Searchbar from './Searchbar.js';
import Image from 'react-bootstrap/Image';
import Iconlogo from './foodforest_icon_logo_resize.PNG';
import Textlogo from './foodforest_text_logo.PNG';
import './Navbar.css';
import { Container, Row, Col } from 'reactstrap';

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
        <Navbar color="faded" light expand="sm" style={{backgroundColor: '#4f4541'}}>
            <NavbarBrand href="/">
              <Image src= {Iconlogo} alt="Iconlogo" style={{width:50}} />
            </NavbarBrand>
            <NavbarBrand href="https://festivalbeach.org/">
              <Image src= {Textlogo} alt="Textlogo" style={{width:150}} />
            </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <Container>
                <Row className="right">
                  <Col xs={8}>
                    <NavItem>
                      <Searchbar info={this.props.info} updateFilters={this.props.updateFilters}/>
                    </NavItem>
                  </Col>
                  <Col xs={2}>
                    <NavItem>
                      <Filter info={this.props.info} updateFilters={this.props.updateFilters} style={{color: 'white'}} />
                    </NavItem>
                  </Col>
                </Row>
              </Container>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
