import React from 'react';
import path from 'path';
// import ReactBootstrap from 'react-bootstrap';
import { Button, Image, Collapse, Well, Row, Col } from 'react-bootstrap';

// import { url } from 'url-loader'
// import img from './assets/img/kent_profile.jpg'

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: []
    }
  }

  componentDidMount() {
    const data_string = require('./assets/data.json');
    const data = JSON.parse(data_string);
    console.log(data)
    this.setState({questions: data.questions});
  }

  render() {
    return (
      <div className="container">
        <ul className="list-group">
          {this.state.questions.map(question =>
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
            {this.props.question.question}
            <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
              click
            </Button>
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