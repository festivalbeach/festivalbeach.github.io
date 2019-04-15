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
        <Button color="success" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.buttonLabel}</ModalHeader>
          <ModalBody>
              Name: {this.props.plantInfoProp['Label']} <br />
              Genus: {this.props.plantInfoProp['Genus']} <br />
              Family: {this.props.plantInfoProp['Family']} <br />
              Cousin: {this.props.plantInfoProp['Cousin']} <br />
              Species: {this.props.plantInfoProp['Species']} <br />
              {/* Strata: <br />
              Forest Fruit Type: {} <br />
              Biological Fruit Type: {} <br />
              Culinary Fruit Type: {} <br />
              Fruit Color: {} <br />
              Fruit Edibility: {} <br />
              Bloom Color: {} <br />
              Flower Edibility: {} <br />
              Leaf Edibility: {} <br />
              Bark Edibility: {} <br />
              Seed Edibility: {} <br />
              Overall Toxicity: {} <br /> */}
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