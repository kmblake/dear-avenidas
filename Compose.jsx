import React from 'react';
// import ReactBootstrap from 'react-bootstrap';
import { Modal, Popover, Tooltip, OverlayTrigger, Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

class Compose extends React.Component {
  // getInitialState() {
  //   return { showModal: false };
  // }

  constructor(props) {
    super(props);

    this.state = {
      showModal: true,
      subject: 'New Question'
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

  // renderForm() {
  //   return (
  //     <Form horizontal>
  //       <FormGroup controlId="formSubject">
  //         <Col componentClass={ControlLabel} sm={2}>
  //           Subject
  //         </Col>
  //         <Col sm={10}>
  //           <FormControl type="text" placeholder="Subject" />
  //         </Col>
  //       </FormGroup>

  //       <FormGroup controlId="formQuestion">
  //         <Col componentClass={ControlLabel} sm={2}>
  //           Question
  //         </Col>
  //         <Col sm={10}>
  //           <FormControl componentClass="textarea" placeholder="textarea" />
  //         </Col>
  //       </FormGroup>
  //     </Form>
  //   );
  // }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    return (
      <div>
        <Modal show={this.state.showModal} onHide={() => this.close()}>
          <Modal.Header closeButton>
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
            <Button onClick={() => this.send()}>Send</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Compose;
