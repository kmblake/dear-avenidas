import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import App from './App.jsx';
import Feed from './Feed.jsx';
import Inbox from './Inbox.jsx';
import Profile from './Profile.jsx';

// ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render((
   <Router history = {browserHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {Feed} />
         <Route path = "feed?q=:query" component = {Feed} />
         <Route path = "feed" component = {Feed} />
         <Route path = "inbox" component = {Inbox} />
         <Route path = "profile" component = {Profile} />
      </Route>
   </Router>
	
), document.getElementById('app'))