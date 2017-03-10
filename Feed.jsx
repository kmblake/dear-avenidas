import React from 'react';
import path from 'path';
// import ReactBootstrap from 'react-bootstrap';
import { Button, Image } from 'react-bootstrap';

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
              profile={question.profile}
              question={question.question}
              tag={question.tag}
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
      expanded: false
    }
  }

	render() {
    return (
      <li className="list-group-item">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="row">
              <div className="col-xs-1">
               <Image src={require('./assets/img/' + this.props.profile)} circle responsive />
              </div>
              <div className="col-xs-11">
                <h3 className="panel-title">{this.props.tag}</h3>
              </div>
            </div>
          </div>
        
          <div className="panel-body">
            {this.props.question}
          </div>
        </div>
      </li>
    );
  }
}

export default Feed;