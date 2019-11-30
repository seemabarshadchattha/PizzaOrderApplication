import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { CssBaseline, Container, Button } from "@material-ui/core";
import { Alert } from "react-bootstrap";
import store from "./Redux";

class Settings extends Component {
  constructor(props) {
    super(props);
    const { settings } = this.props.settings;

    this.state = {
      peoples: settings.peoples ? settings.peoples : "",
      flavours: settings.flavours ? settings.flavours : "",
      slicesperperson: settings.slicesperperson ? settings.slicesperperson : "",
      slicesinpizza: settings.slicesinpizza ? settings.slicesinpizza : "",
      plabel: "",
      phelper: "",
      flabel: "",
      fhelper: "",
      slabel: "",
      shelper: "",
      splabel: "",
      sphelper: "",
      validation: false,
      datasavedflag: false
    };
  }

  handlePeoples = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      if (this.state.peoples <= 0) {
        this.setState({ plabel: "Invalid" });
        this.setState({ phelper: "Please enter valid value" });
      } else {
        this.setState({ plabel: "" });
        this.setState({ phelper: "" });
      }
    });
  };

  handleFlavours = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      if (this.state.flavours <= 0) {
        this.setState({ flabel: "Invalid" });
        this.setState({ fhelper: "Please enter valid value" });
      } else {
        this.setState({ flabel: "" });
        this.setState({ fhelper: "" });
      }
    });
  };

  handleSlicesPerPerson = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      if (this.state.slicesperperson <= 0 || this.state.slicesperperson >= 5) {
        this.setState({ slabel: "Invalid" });
        this.setState({ shelper: "Please enter valid value" });
      } else {
        this.setState({ slabel: "" });
        this.setState({ shelper: "" });
      }
    });
  };

  handleSlicesInPizza = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      if (this.state.slicesinpizza <= 5 || this.state.slicesinpizza >= 19) {
        this.setState({ splabel: "Invalid" });
        this.setState({ sphelper: "Please enter valid value" });
      } else {
        this.setState({ splabel: "" });
        this.setState({ sphelper: "" });
      }
    });
  };

  resetStore = event => {
    store.dispatch({ type: "RESET" });
    this.setState({ peoples: "" });
    this.setState({ flavours: "" });
    this.setState({ slicesperperson: "" });
    this.setState({ slicesinpizza: "" });
    this.props.resetSetting();
  };

  onSubmit = () => {
    if (
      this.state.peoples < 0 ||
      this.state.peoples == "" ||
      this.state.flavours < 0 ||
      this.state.flavours == "" ||
      this.state.slicesperperson < 0 ||
      this.state.slicesperperson == "" ||
      this.state.slicesinpizza < 0 ||
      this.state.slicesinpizza == "" ||
      this.state.slicesperperson >= 5 ||
      this.state.slicesinpizza <= 5 ||
      this.state.slicesinpizza >= 19
    ) {
      this.setState({ validation: true });
      this.setState({ datasavedflag: false });
    } else {
      this.props.saveData({
        peoples: this.state.peoples,
        flavours: this.state.flavours,
        slicesperperson: this.state.slicesperperson,
        slicesinpizza: this.state.slicesinpizza
      });
      this.setState({ validation: false });
      this.setState({ datasavedflag: true });
    }
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <div>
            <h1>Settings {this.state.validation}</h1>
            {this.state.validation ? (
              <Alert key="danger" variant="danger">
                All fileds are mandatory, please enter correct values!
              </Alert>
            ) : (
              ""
            )}
            {this.state.datasavedflag ? (
              <Alert key="success" variant="success">
                Setting successfully saved, please go ahead and select peoples
                option!
              </Alert>
            ) : (
              ""
            )}
          </div>
          <div className="row">
            <TextField
              error
              id="standard"
              name="peoples"
              placeholder="No of peoples"
              label={this.state.plabel}
              helperText={this.state.phelper}
              margin="normal"
              type="number"
              value={this.state.peoples}
              fullWidth
              onChange={this.handlePeoples}
            />
          </div>
          <div className="row">
            <TextField
              error
              name="flavours"
              id="standard"
              placeholder="No of flavours"
              label={this.state.flabel}
              helperText={this.state.fhelper}
              margin="normal"
              type="number"
              value={this.state.flavours}
              fullWidth
              onChange={this.handleFlavours}
            />
          </div>
          <div className="row">
            <TextField
              error
              name="slicesperperson"
              id="standard"
              placeholder="No of slices per person"
              label={this.state.slabel}
              helperText={this.state.shelper}
              margin="normal"
              type="number"
              value={this.state.slicesperperson}
              fullWidth
              onChange={this.handleSlicesPerPerson}
            />
          </div>
          <div className="row">
            <TextField
              error
              id="standard"
              placeholder="No of slices in pizza"
              label={this.state.splabel}
              helperText={this.state.sphelper}
              margin="normal"
              type="number"
              name="slicesinpizza"
              value={this.state.slicesinpizza}
              fullWidth
              onChange={this.handleSlicesInPizza}
            />
          </div>
          <div className="row">
            <div className="col-md-12" style={{ margin: "10px" }}>
              <Button
                variant="contained"
                color="secondary"
                style={{ margin: "10px" }}
                onClick={this.resetStore}
              >
                Reset Settings
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "10px" }}
                onClick={this.onSubmit}
              >
                Save Settings
              </Button>
            </div>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default Settings;
