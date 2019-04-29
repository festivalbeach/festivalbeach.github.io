import React, { Component } from 'react';
import { InputGroup, Input } from 'reactstrap';


class Searchbar extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        console.log('Search: ' + e.target.value)
        var info = this.props.info
        var filtered = new Set()
        if (e.target.value !== ''){
            Object.keys(info).map((key) => {
                var query = e.target.value.toLowerCase()
                var plant = info[key]['Label'].toLowerCase()
                if (plant.indexOf(query) < 0){
                    console.log(info[key]['Label'])
                    filtered.add(info[key]['Label'])
                }
            })
        }

        console.log('filter size: ' + filtered.size)
        this.props.updateFilters(filtered)
        
    }
    render() {
      return (
          <InputGroup>
            <Input onChange={this.handleChange} style={{color:'gray', size: 'small'}} placeholder="Search" />
          </InputGroup>
      );
    };
}

export default Searchbar
