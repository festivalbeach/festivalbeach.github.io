import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';


class Searchbar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
      return (
          <InputGroup>
            <Input style={{color:'gray', size: 'small'}} placeholder="Search" />
          </InputGroup>
      );
    };
}

export default Searchbar
