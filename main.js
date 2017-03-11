import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import App from './App.jsx';
import Feed from './Feed.jsx';
import Inbox from './Inbox.jsx';

// ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render((
   <Router history = {browserHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {Feed} />
         <Route path = "feed?q=:query" component = {Feed} />
         <Route path = "feed/:query" component = {Feed} />
         <Route path = "inbox" component = {Inbox} />
      </Route>
   </Router>
	
), document.getElementById('app'))