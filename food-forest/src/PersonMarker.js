import React from 'react';
import styled from 'styled-components';

class PersonMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

   render() {
    return (
      <div>
        <div className="icon" ><i class="material-icons" style={{color: '#EE2737'}}>accessibility</i></div>
        <icon >
          <div style={{color: 'white', size: '5em', position: 'relative'}}>YOU ARE HERE</div>
        </icon>
      </div>
    );
  }
}

export default PersonMarker;
