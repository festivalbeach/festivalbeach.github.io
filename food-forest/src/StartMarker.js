import React from 'react';

class StartMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

   render() {
    return (
      <div>
        <div className="icon" ><i className="material-icons" style={{color: '#EE2737'}}>star</i></div>
        <icon >
          <div style={{color: 'white', size: '5em', position: 'relative'}}>Entrance</div>
        </icon>
      </div>
    );
  }
}

export default StartMarker;
