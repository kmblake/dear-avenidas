import React from 'react';
import path from 'path';
import { Button, Image, Collapse, Well, Row, Col, Nav, NavItem } from 'react-bootstrap';

class Inbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      tab: 1
    }
  }

  componentDidMount() {
    const data_string = require('./assets/data.json');
    const data = JSON.parse(data_string);
    console.log(data)
    this.setState({questions: data.questions});
  }

  handleSelect(selectedKey) {
    this.setState({tab: selectedKey})
  }

  render() {
    console.log("rendering inbox");
    return (
      <div className="container">
        <Nav bsStyle="tabs" activeKey={this.state.tab} onSelect={(key) => this.handleSelect(key)}>
          <NavItem eventKey={1} >Questions</NavItem>
          <NavItem eventKey={2} >Follow Ups</NavItem>
        </Nav>
      </div>
    );
  }
}

export default Inbox;