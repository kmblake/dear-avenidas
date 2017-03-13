import React from 'react';
import path from 'path';
import { Button, Image, Collapse, Well, Row, Col, FormGroup, FormControl, ControlLabel, ListGroupItem, Tooltip, OverlayTrigger } from 'react-bootstrap';
import SearchInput, {createFilter} from 'react-search-input';

const KEYS_TO_FILTERS = ['question', 'subject', 'tag']

class Feed extends React.Component {
  constructor(props) {
    super(props);
    const data_string = (props.inbox) ? require('./assets/my_questions.json') : require('./assets/feed.json');
    const data = JSON.parse(data_string);
    this.questions = data.questions
    this.state = {
      questions: this.questions,
      searchTerm: ''
    }
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  render() {
    const filteredQuestions = this.questions.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
      <div className="container">
        <ul>
          <ListGroupItem className="no-border neutral-background">
            <SearchInput className="search-input form-control" onChange={(term) => this.searchUpdated(term)} />
          </ListGroupItem>
          {filteredQuestions.map(question =>
            <FeedItem
              question={question}
              key={question.id}
              inbox={this.props.inbox}
            />
          )}
        </ul>
      </div>
    );
  }
}

class FeedItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      replyOpen: false,
      sending: false,
      replySent: false,
      hasOpenedAnswer: false
    }
  }

  renderButtons() {
    if (this.props.inbox && !this.state.replyOpen && !this.state.replySent) {
      return (
        <Button onClick={() => this.setState({replyOpen: true})}>Reply</Button>
      );
    }
  }

  renderReply() {
    if (this.state.replyOpen) {
      return (
        <form>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Reply</ControlLabel>
            <FormControl ref="reply" componentClass="textarea" placeholder="Type your reply here" inputRef={ref => { this.reply = ref; }} />
          </FormGroup>
          { this.renderSending() }
        </form>
      );
    } else if (this.state.replySent) {
      return (
        <p>Reply: {this.reply.value}</p>
      );
    }
  }

  renderSending() {
    console.log(this.refs)
    if (this.state.sending) {
      return (
        <Row>
          <Col md={6}>
            <Button onClick={() => this.sendReply()}>Send as Note (free)</Button>
          </Col>
          <Col md={6}>
            <Button onClick={() => this.sendReply()}>Send as Card ($3.99)
            </Button>
          </Col>
        </Row>
      );
    } else {
      return (<Button onClick={() => this.setState({sending: true})}>Send</Button>);
    }
  }

  sendReply() {
    this.setState({sending: false, replySent: true, replyOpen: false})
  }

  renderAboutMe(question) {
    if (question.about_me) {
      return (
        <Row>
          <Col xs={1}>
            <Image src={require('./assets/img/' + this.props.question.profile)} circle responsive className="pull-right" />
          </Col>
          <Col xs={11}>
            <Image src={require('./assets/img/' + this.props.question.about_me)} responsive />
          </Col>
        </Row>
      );
    } else if (question.photo) {
      return (
        <Row>
          <Col xs={112}>
            <Image src={require('./assets/img/' + this.props.question.photo)} className="fill-horizontal" responsive />
          </Col>
        </Row>
      );
    }
  }

  renderPanelBody() {
    const tooltip = (
      <Tooltip id="tooltip" className="disabled">Click to see the answer!</Tooltip>
    );
    const panelBody = (
      <div className="panel-body">
        <div onClick={ ()=> this.setState({ open: !this.state.open, hasOpenedAnswer: true })}>
          <p>{this.props.question.question}</p>
          {this.renderAboutMe(this.props.question)}
        </div>
        <Collapse in={this.state.open}>
          <div>
            <Well>
              <Row>
                <Col xs={12}>
                  <Image src={require('./assets/img/' + this.props.question.answer)} rounded responsive />
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  {this.renderButtons()}
                  {this.renderReply()}
                </Col>
              </Row>
            </Well>
          </div>
        </Collapse>
      </div>
    );
    if (this.state.hasOpenedAnswer) {
      return (
        <div>
          {panelBody}
        </div>
      );
    } else {
      return(
        <OverlayTrigger placement="left" overlay={tooltip}>
          {panelBody}
        </OverlayTrigger>
      );
    }
  }

	render() {
    
    return (
      <li className="no-border neutral-background list-group-item">
        <div className="panel panel-default">
          <div className="panel-heading">
            <Row>
              <Col xs={12}>
                <h3 className="panel-title pull-right">{this.props.question.tag}</h3>
                <h3 className="panel-title">{this.props.question.subject}</h3>
              </Col>
            </Row>
          </div>
          {this.renderPanelBody()}
          
        </div>
      </li>
    );
  }
}

export default Feed;