import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class PlantInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  displayTF(column) {
    if(column == "TRUE"){
      return "Yes";
    }
    else if(column == "FALSE"){
      return "No";
    }
    return "";
  }

   render() {
    return (
      <div>
        <div className="icon" ><i className="material-icons" style={{color:this.props.color}}onClick={this.toggle}>local_florist</i></div>
        <icon>
          <div style={{color: 'white', fontSize: '.8em', position: 'relative', right: '2px'}}>{this.props.plant}</div>
        </icon>
        <Modal scrollable isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered = "true">
          <ModalHeader 
            style={{backgroundColor: ((this.props.plantInfoProp['Bloom Color'] == "" || this.props.plantInfoProp['Bloom Color'] == "White") ? "#A4D65E" : this.props.plantInfoProp['Bloom Color'])}} 
            toggle={this.toggle}>
              <font size="5">{this.props.plant}</font><br />
              <font size="3">{this.props.plantInfoProp['Family']} {this.props.plantInfoProp['Genus']} {this.props.plantInfoProp['Species']}</font>
          </ModalHeader>
          <ModalBody>
              Harvest Start: {this.props.plantInfoProp['Harvest Start']} <br />
              Harvest End: {this.props.plantInfoProp['Harvest End']} <br />
              <hr color = "black" width = "90%"></hr>
              Fruit Edibility: {this.displayTF(this.props.plantInfoProp['Edible (fruit) Y/N'])} <br />
              Flower Edibility: {this.displayTF(this.props.plantInfoProp['Edible Flower  Y/N'])} <br />
              Leaf Edibility: {this.displayTF(this.props.plantInfoProp['Edible Leaf'])} <br />
              Bark Edibility: {this.displayTF(this.props.plantInfoProp['Edible Bark Y/N'])} <br />
              Seed Edibility: {this.displayTF(this.props.plantInfoProp['Edible Seed'])} <br />
              Overall Toxicity Rating (1-4): {this.props.plantInfoProp['Toxicity (Rating: 1-4)']} <br />
              Fruit Type: {this.props.plantInfoProp['Fruit Type']} <br />
              Bloom Color: {this.props.plantInfoProp['Bloom Color']} <br />
              Water Use: {this.props.plantInfoProp['Water Use']} <br />
          </ModalBody>
          <ModalFooter style={{backgroundColor: ((this.props.plantInfoProp['Bloom Color'] == "" || this.props.plantInfoProp['Bloom Color'] == "White") ? "#A4D65E" : this.props.plantInfoProp['Bloom Color'])}}>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PlantInfo;
