import React from 'react';
// import ReactBootstrap from 'react-bootstrap';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, FormGroup, FormControl, Button, Form, ControlLabel, Alert} from 'react-bootstrap';
import Compose from './Compose.jsx';
import {
  BrowserRouter as Router,
  BrowserHistory,
  Route,
  Link
} from 'react-router-dom';
import {history} from 'react-router/lib/BrowserHistory';
import { LinkContainer } from 'react-router-bootstrap';
require('./assets/css/app.scss');


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCompose: false,
      messageSent: false,
      followUpSent: false
    }
  }

  onComposeClosed(messageSent) {
      this.setState({ showCompose: false, messageSent: messageSent})
  }

  renderCompose() {
    if (this.state.showCompose) 
      return <Compose
              notifyParent={(messageSent) => this.onComposeClosed(messageSent) }
            />
    console.log("Compose")
  }

  renderAlert() {
    var msg = "";
    if (this.state.messageSent) {
      msg = 'Your question has been submitted!'
    } else if (this.state.followUpSent) {
      msg = 'Your follow up question has been submitted!'
    }
    if (this.state.messageSent || this.state.followUpSent) {
      setTimeout(() => this.setState({messageSent: false, followUpSent: false}), 1800)
      return (
        <Alert bsStyle="success">
          <strong>{msg}</strong> You should recieve a reply within a week...we'll keep you posted :)
        </Alert>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
    
  }

  revealCompose() {
    this.setState({showCompose: true});
  }

  submitSearch() {
    // var elements = this.refs.form.getDOMNode().elements;
    const q = this.state.input.value;
    const location = {
      pathname: '/#feed?q=' + q
    }
    this.props.router.push(location);
  }

  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect className="custom-navbar">
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Dear-Avenidas</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
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
        {this.renderAlert()}
        {this.renderCompose()}
        {this.props.children}
      </div>
    );
  }
}

export default App;