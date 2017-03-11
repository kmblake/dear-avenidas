import React from 'react';
// import ReactBootstrap from 'react-bootstrap';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, FormGroup, FormControl, Button, Form, ControlLabel} from 'react-bootstrap';
import Compose from './Compose.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCompose: false
    }
  }

  onComposeClosed() {
      this.setState({ showCompose: false})
  }

  renderCompose() {
    if (this.state.showCompose) 
      return <Compose
              notifyParent={() => this.onComposeClosed() }
            />
    console.log("Compose")
  }

  revealCompose() {
    this.setState({showCompose: true});
  }

  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">Dear-Avenidas</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Navbar.Form pullLeft>
                <FormGroup>
                  <FormControl type="text" placeholder="Search" />
                </FormGroup>
                {' '}
                <Button type="submit">Submit</Button>
              </Navbar.Form>
              <Nav pullRight>
                <LinkContainer to="/">
                  <NavItem eventKey={1} href="#">Home</NavItem>
                </LinkContainer>
                <NavItem eventKey={2} href="#" onClick={()=> this.setState({ showCompose: true })}>Compose</NavItem>
                
                <LinkContainer to="/inbox">
                  <NavItem eventKey={3} href="#">Inbox</NavItem>
                </LinkContainer>
                <LinkContainer to="/profile">
                  <NavItem eventKey={4} href="#">Profile</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
        {this.renderCompose()}
        {this.props.children}
      </div>
    );
  }
}

export default App;