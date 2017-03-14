import React from 'react';
// import ReactBootstrap from 'react-bootstrap';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, FormGroup, FormControl, Button, Form, ControlLabel, Alert, Image, Thumbnail, Tooltip, OverlayTrigger} from 'react-bootstrap';
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

  renderTooltip(msg) {
    return (
      <Tooltip id="tooltip">{msg}</Tooltip>
    );
  }

  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect className="custom-navbar">
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/"><Image src={require('./assets/img/logo2.png')} responsive className="logo" /></Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <OverlayTrigger placement="bottom" overlay={this.renderTooltip("Ask a Question")}>
                  <NavItem eventKey={2} href="#" onClick={()=> this.setState({ showCompose: true })}>
                    <Image src={require('./assets/img/pencil_icon.png')} responsive />
                  </NavItem>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={this.renderTooltip("Inbox")}>
                  <LinkContainer to="/inbox">
                    <NavItem eventKey={3} href="#">
                      <Image className='inbox-icon' src={require('./assets/img/inbox_icon.png')} responsive />
                    </NavItem>
                  </LinkContainer>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={this.renderTooltip("Profile")}>
                  <LinkContainer to="/profile">
                    <NavItem eventKey={4} href="#">
                      <Image className='profile-icon' src={require('./assets/img/kent_profile.jpg')} responsive circle />
                    </NavItem>
                  </LinkContainer>
                </OverlayTrigger>
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