import React from 'react';
import path from 'path';
import { Button, Image, Collapse, Well, Row, Col, FormGroup, FormControl, ControlLabel, ListGroupItem, Tooltip, OverlayTrigger, Thumbnail } from 'react-bootstrap';
import SearchInput, {createFilter} from 'react-search-input';
import Reply from './Reply.jsx';
require('./assets/css/feed.scss');

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
      hasOpenedAnswer: false,
      liked: false
    }
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

  renderAnswer() {
    const heart_img = (this.state.liked) ? 'heart_filled.png' : 'heart_empty.png';
    const like_count = (this.state.liked) ? this.props.question.likes : this.props.question.likes + 1
    if (this.props.inbox) {
      return (
        <Reply
          question={this.props.question}
        />
      );
    } else {
      return (
          <div>
            <Well>
              <Row>
                <Col xs={12}>
                  <Image src={require('./assets/img/' + this.props.question.answer)} rounded responsive />
                </Col>
              </Row>
            </Well>
            <Row>
              <Col xs={1}>
                <Image className="like-button pull-right" src={require('./assets/img/' + heart_img)} onClick={() => this.setState({liked: !this.state.liked})} />
              </Col>
              <Col xs={2} className="like-button-label">
                <h4 className="pull-left">{like_count}</h4>
              </Col>
              <Col xs={7}>
              </Col>
              <Col xs={2} className="date-label">
                <weak className="pull-right">{this.props.question.days_ago} days ago</weak>
              </Col>
            </Row>
          </div>
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
          {this.renderAnswer()}
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
          <div className="custom-panel-heading panel-heading">
            <Row>
              <Col xs={12}>
                <h3 className="panel-title pull-right"><weak>{this.props.question.tag}</weak></h3>
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