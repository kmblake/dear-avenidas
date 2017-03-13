import React from 'react';
// import ReactBootstrap from 'react-bootstrap';
import { Modal, Popover, Tooltip, OverlayTrigger, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox, Row, Col, Image} from 'react-bootstrap';
require('./assets/css/compose.scss');

class Compose extends React.Component {
  // getInitialState() {
  //   return { showModal: false };
  // }

  constructor(props) {
    super(props);

    this.state = {
      showModal: true,
      subject: 'New Question',
      isAnon: false
    }
  }

  close() {
    this.setState({ showModal: false });
    this.props.notifyParent(false)
  }

  send() {
    this.setState({ showModal: false });
    this.props.notifyParent(true)
  }

  open() {
    this.setState({ showModal: true });
  }

  FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

  render() {
    const profile = (this.state.isAnon) ? "profile.png" : "kent_profile.jpg";
    const name = (this.state.isAnon) ? "Anonymous" : "John Doe";
    return (
      <div>
        <Modal className='custom-modal' show={this.state.showModal} onHide={() => this.close()}>
          <Modal.Header className="custom-modal-header" closeButton>
            <Modal.Title>{this.state.subject}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <this.FieldGroup
                id="formControlsText"
                type="text"
                label="Subject"
                placeholder="Enter subject"
              />
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Question</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Type your question for the Avenidas community here" />
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Tag</ControlLabel>
                <FormControl componentClass="select" placeholder="Choose a Tag">
                  <option value="select">Life Advice</option>
                  <option value="other">Careers</option>
                  <option value="other">Relationships</option>
                </FormControl>
              </FormGroup>
            </form>
            
          </Modal.Body>
          <Modal.Footer>
            <Row className="compose-footer">
              <Col xs={2}>
                <Image src={require('./assets/img/' + profile)} circle responsive />
              </Col>
              <Col xs={3}>
                <h4 className="pull-left">{name}</h4>
              </Col>
              <Col xs={4}>
                <Checkbox className="pull-left anonymous-checkbox" onClick={() => this.setState({isAnon: !this.state.isAnon})}>
                  <weak>Anonymous</weak>
                </Checkbox>
              </Col>
              <Col xs={3}>
                <Button onClick={() => this.send()} bsStyle="primary" bsSize="large">Send</Button>
              </Col>
            </Row>
            
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Compose;
