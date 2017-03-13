import React from 'react';
import path from 'path';
import Feed from './Feed.jsx';
import { Button, Image, Collapse, Well, Row, Col, Nav, NavItem } from 'react-bootstrap';

class Inbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
    }
  }


  render() {
    console.log("rendering inbox");
    return (
      <div className="container">
        <h1 className="centered">Your Questions</h1>
        <Feed inbox="true"/>
      </div>
    );
  }
}

export default Inbox;