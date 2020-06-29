import React from 'react';
import { Typography } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Blogs from './Blogs'
import Editor from './Editor';
import Show from './Show';

class App extends React.Component {
  render() {
    return (
      <div className="App" >
        <Typography variant='h3'>Sora's Blog</Typography>
        <Router>
          <Switch>
            <Route exact path="/" component={Blogs} />
            <Route exact path='/Edit' component={Editor} />
            <Route path='/Edit/:id' component={Editor} />
            <Route path='/Show/:id' component={Show} />
          </Switch>
        </Router>
      </div >
    );
  }
}

export default App;