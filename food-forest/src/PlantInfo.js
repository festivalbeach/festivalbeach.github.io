import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styled from 'styled-components';

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
        <div className="icon" ><i class="material-icons" style={{color:this.props.color}}onClick={this.toggle}>local_florist</i></div>
        <icon >
          <div style={{color: 'white', size: '5em', position: 'relative', right: '5px'}}>{this.props.plant}</div>
        </icon>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.plant}</ModalHeader>
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
