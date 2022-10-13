import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import React, { Component } from "react";
import AddMondel from "./components/add-mondel.component";
import MondelsList from "./components/mondels.list.component";
import Mondel from "./components/mondel.component"

class App extends Component {
  render() {
    return (
      <header className='App-header'>
      <Router >
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/mondels"} className="navbar-brand">
            Omer and Amit
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/mondels"} className="nav-link">
                  Mondels
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/","/mondels"]} component={MondelsList} />
            <Route exact path="/add" component={AddMondel} />
            <Route path="/mondels/:id" component={Mondel} />
          </Switch>
        </div>
      </Router></header>
    );
  }
}
export default App;
