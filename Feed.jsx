import React from 'react';
import path from 'path';
import { Button, Image, Collapse, Well, Row, Col } from 'react-bootstrap';
import SearchInput, {createFilter} from 'react-search-input';

const KEYS_TO_FILTERS = ['question', 'subject', 'tag']

class Feed extends React.Component {
  constructor(props) {
    super(props);
    const data_string = require('./assets/data.json');
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
        <SearchInput className="search-input" onChange={(term) => this.searchUpdated(term)} />
        <ul className="list-group">
          {filteredQuestions.map(question =>
            <FeedItem
              question={question}
              key={question.id}
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
      open: false
    }
  }

	render() {
    return (
      <li className="no-border list-group-item">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="row">
              <div className="col-xs-1">
               <Image src={require('./assets/img/' + this.props.question.profile)} circle responsive />
              </div>
              <div className="col-xs-11">
                <h3 className="panel-title">{this.props.question.tag}</h3>
              </div>
            </div>
          </div>
        
          <div className="panel-body">
            <div onClick={ ()=> this.setState({ open: !this.state.open })}>
              {this.props.question.question}
            </div>
            <Collapse in={this.state.open}>
              <div>
                <Well>
                  <Row>
                    <Col xs={12}>
                      <Image src={require('./assets/img/' + this.props.question.answer)} rounded responsive />
                    </Col>
                  </Row>
                </Well>
              </div>
            </Collapse>
          </div>
        </div>
      </li>
    );
  }
}

export default Feed;