import React from 'react';
import path from 'path';
import { Button, Image, Collapse, Well, Row, Col, FormGroup, FormControl, ControlLabel, ListGroupItem, Tooltip, OverlayTrigger, Thumbnail } from 'react-bootstrap';
require('./assets/css/reply.scss');


class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      replyOpen: false,
      sending: false,
      replySent: false,
      isNote: true
    }
  }

  renderButtons() {
    if (!this.state.replyOpen && !this.state.replySent) {
      return (
        <p><Button className="pull-right top-space" bsStyle="primary" bsSize="large" onClick={() => this.setState({replyOpen: true})}>Reply</Button></p>
      );
    }
  }

  renderReply() {
    if (this.state.replyOpen) {
      return (
        <div>
          <Row className="top-space">
            <Col xs={1}>
            </Col>
            <Col xs={10}>
              <form>
                <FormGroup controlId="formControlsTextarea">
                  <FormControl ref="reply" componentClass="textarea" placeholder="Type your reply here" inputRef={ref => { this.reply = ref; }} />
                </FormGroup>
              </form>
            </Col>
            <Col xs={1}>
              <Image src={require('./assets/img/kent_profile.jpg')} circle responsive />
            </Col>
          </Row>
          { this.renderSending() }
          
        </div>
      );
    } else if (this.state.replySent) {
      const replyType = this.state.isNote ? "note" : "greeting card";
      return (
        <Row className="top-space">
            <Col xs={1}>
            </Col>
            <Col xs={10}>
              <p>{this.reply.value}</p>
              <weak>Your reply will be sent as a {replyType} <strong>today</strong>!</weak>
            </Col>
            <Col xs={1}>
              <Image src={require('./assets/img/kent_profile.jpg')} circle responsive />
            </Col>
          </Row>
      );
    }
  }

  renderSending() {
    console.log(this.refs)
    if (this.state.sending) {
      return (
        <Row>
          <Col md={6}>
            <Button bsStyle="primary pull-right" onClick={() => this.sendReply(true)}>Send as Note (free)</Button>
          </Col>
          <Col md={6}>
            <Button bsStyle="info" onClick={() => this.sendReply(false)}>Send as Card ($3.99)
            </Button>
          </Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col xs={11}>
          </Col>
          <Col xs={1}>
            <Button className="pull-right" bsStyle="primary" bsSize="large" onClick={() => this.setState({sending: true})}>Send</Button>
          </Col>
        </Row>
      );
    }
  }

  sendReply(isNote) {
    this.setState({sending: false, replySent: true, replyOpen: false, isNote: isNote })
  }

  render() {
    const timestamp = (this.state.replyOpen || this.state.replySent) ? (<div></div>) : (<weak>4 days ago</weak>);
    return (
        <div>
          <Well>
            <Row>
              <Col xs={1}>
                <Image src={require('./assets/img/' + this.props.question.profile)} circle responsive />
              </Col>
              <Col xs={10}>
                <Image src={require('./assets/img/' + this.props.question.answer)} rounded responsive />
                {timestamp}
              </Col>
              <Col xs={1}>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                {this.renderButtons()}
                {this.renderReply()}
              </Col>
            </Row>
          </Well>
          <Row>
            <Col xs={12} className="date-label">
              <weak className="pull-right">{this.props.question.days_ago} days ago</weak>
            </Col>
          </Row>
        </div>
    );
  }
}

export default Reply;