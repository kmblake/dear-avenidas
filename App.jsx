import React from 'react';
// import ReactBootstrap from 'react-bootstrap';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, FormGroup, FormControl, Button, Form, ControlLabel} from 'react-bootstrap';

class App extends React.Component {
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
                <NavItem eventKey={1} href="#">Home</NavItem>
                <NavItem eventKey={2} href="#">Compose</NavItem>
                <NavItem eventKey={2} href="#">Inbox</NavItem>
                <NavItem eventKey={2} href="#">Profile</NavItem>
              </Nav>
            </Navbar.Collapse>
        </Navbar>

        {this.props.children}
      </div>
    );
  }
}

export default App;