import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import '../growth/css/bootstrap4-growth.min.css'
import 'bootstrap/dist/js/bootstrap.min.js';

import { ClassInfo } from "./components/ClassInfo";
import { TestHome } from "./components/TestHome";
import { ClassSearch } from "./components/ClassSearch";
import { NavBar } from "./components/NavBar";
import { App } from "./components/App";
import { ClassBundle } from "./components/ClassBundle";
import { Authentication } from "./components/Authentication";
import { ClassPage } from './components/ClassPage';
import { ClassTopLevel } from "./components/ClassTopLevel";
import { Auth2 } from "./components/Auth2";

//npx webpack to run and then open index.html
//npm start runs webpack and starts server

const routing = (
  
    <Router>
      <div>
        <NavBar/>
        <Switch>
          <Route path="/class/:code" component={ClassPage}/>
          <Route path="/" component={ClassTopLevel} />
        </Switch>
      </div>
    </Router>
    
)

ReactDOM.render(routing, document.getElementById("root"))