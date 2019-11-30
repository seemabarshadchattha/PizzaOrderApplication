import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Nav from "react-bootstrap/Nav";
import { NavDropdown, Navbar } from "react-bootstrap";
import Settings from "./components/Settings";
import SelectFlavours from "./components/SelectFlavours";
import store from "./components/Redux";
import PizzaSummary from "./components/PizzaSummary";

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { personslinks: [] };
  }

  saveData = settings => {
    const pizzaObject = {
      peoples: settings.peoples,
      flavours: settings.flavours,
      slicesperperson: settings.slicesperperson,
      slicesinpizza: settings.slicesinpizza,
      persons: []
    };
    for (let i = 1; i <= settings.peoples; i++) {
      let person = { personid: i, flavours: [] };
      for (let j = 1; j <= settings.flavours; j++) {
        person.flavours.push({
          fid: j,
          personid: i,
          name: "Flavoure " + j,
          count: 0
        });
      }
      pizzaObject.persons.push(person);
    }
    store.dispatch({ type: "SAVE", pizza: pizzaObject });
    this.makePersonMenu();
  };

  makePersonMenu = () => {
    let persons = [];
    for (let i = 1; i <= store.getState().persons.length; i++) {
      persons.push(i);
    }
    this.setState({ personslinks: persons });
  };

  resetSetting = () => {
    this.setState({ personslinks: [] });
  };

  render() {
    const { persons } = store.getState();

    return (
      <Router>
        <div className="App">
          <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <h3>Pizza Order Application</h3>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/" exact strict className="nav-link">
                Settings
              </NavLink>
            </Nav.Item>
            <NavDropdown title="Peoples" id="nav-dropdown">
              {this.state.personslinks.map((person, index) => {
                const link = "/person/" + person;
                return (
                  <NavLink to={link} key={index} className="nav-link">
                    Person {person}
                  </NavLink>
                );
              })}
            </NavDropdown>
            <Nav.Item>
              <NavLink exact strict to="/summary">
                Pizza Summary
              </NavLink>
            </Nav.Item>
          </Nav>
          <Route
            path="/"
            exact
            strict
            render={() => {
              return (
                <Settings
                  resetSetting={this.resetSetting}
                  saveData={this.saveData}
                  settings={store.getState()}
                />
              );
            }}
          />
          <Route
            path="/person/:pid"
            exact
            strict
            render={({ match }) =>
              match.params.pid < 1 || match.params.pid > persons.length ? (
                <Redirect to="/" />
              ) : (
                <SelectFlavours pid={match.params.pid} />
              )
            }
          />
          <Route
            path="/summary"
            exact
            strict
            render={() => {
              return <PizzaSummary />;
            }}
          />
        </div>
      </Router>
    );
  }
}

export default App;
