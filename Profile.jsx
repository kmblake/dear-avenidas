import React from 'react';
import path from 'path';
import { Button, Image, Collapse, Well, Row, Col, Nav, NavItem } from 'react-bootstrap';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }


  render() {
    const profile = "kent_profile.jpg";
    const name = "John Doe";
    return (
      <div className="container">
        <h1 className="centered theme-color">My Profile</h1>
        <Row className="compose-footer">
          <Col xs={2}>
            <Image src={require('./assets/img/' + profile)} circle responsive />
          </Col>
          <Col xs={10}>
            <h2>{name}</h2>
            <h3><weak>Stanford University</weak></h3>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;