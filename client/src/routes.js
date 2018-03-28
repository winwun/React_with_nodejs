import './App.css';
import React from 'react'
import ActivityFeed from './components/activityFeed'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/login';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Login}/>
      <Route path="/activityFeed" component={ActivityFeed}/>
    </div>
  </Router>
)

export default Routes
