import React from 'react';

class PersonMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

   render() {
    return (
      <div>
        <div className="icon" ><i className="material-icons" style={{color: '#EE2737'}}>accessibility</i></div>
        <icon >
          <div style={{color: 'white', size: '5em', position: 'relative'}}>You</div>
        </icon>
      </div>
    );
  }
}

export default PersonMarker;
