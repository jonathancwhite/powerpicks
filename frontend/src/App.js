import React from 'react';
// import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/pages/Home';
import Leagues from './components/pages/Leagues';

import './assets/scss/main.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Route path="/forgot-password" exact element={<ForgotPass />} /> */}
        <Route path="/leagues" exact component={Leagues} />
      </Switch>
    </BrowserRouter>    
  )
}

export default App