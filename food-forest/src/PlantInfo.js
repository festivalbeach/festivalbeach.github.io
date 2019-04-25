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

   render() {
    return (
      <div>
        <div className="icon" ><i className="material-icons" style={{color:this.props.color}}onClick={this.toggle}>local_florist</i></div>
        <icon>
          <div style={{color: 'white', fontSize: '.8em', position: 'relative', right: '2px'}}>{this.props.plant}</div>
        </icon>
        <Modal scrollable isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.plant}</ModalHeader>
          <ModalBody>
              Name: {this.props.plantInfoProp['Label']} <br />
              Genus: {this.props.plantInfoProp['Genus']} <br />
              Family: {this.props.plantInfoProp['Family']} <br />
              Cousin: {this.props.plantInfoProp['Cousin']} <br />
              Species: {this.props.plantInfoProp['Species']} <br />
              Strata: {this.props.plantInfoProp['Species']} <br />
              Fruit Type: {this.props.plantInfoProp['Fruit Type']} <br />
              Fruit Edibility: {this.props.plantInfoProp['Edible (fruit) Y/N']} <br />
              Bloom Color: {this.props.plantInfoProp['Bloom Color']} <br />
              Flower Edibility: {this.props.plantInfoProp['Edible Flower  Y/N']} <br />
              Leaf Edibility: {this.props.plantInfoProp['Edible Leaf']} <br />
              Bark Edibility: {this.props.plantInfoProp['Edible Bark Y/N']} <br />
              Seed Edibility: {this.props.plantInfoProp['Edible Seed']} <br />
              Overall Toxicity Rating (1-4): {this.props.plantInfoProp['Toxicity (Rating: 1-4)']} <br />
              Water Use: {this.props.plantInfoProp['Water Use']} <br />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PlantInfo;
