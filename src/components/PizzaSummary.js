import React, { Component } from "react";
import store from "./Redux";

import { Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 150,
    width: 300
  },
  control: {}
});
class PizzaSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pizza: []
    };
  }

  static getDerivedStateFromProps() {
    const { persons, settings } = store.getState();
    const totalFlavoursWithCount = [];
    for (let person of persons) {
      person.flavours.filter((currentFlavour, index) => {
        totalFlavoursWithCount.push(currentFlavour);
      });
    }
    console.log("totalFlavoursWithCount");
    console.log(totalFlavoursWithCount);
    console.log(settings.flavours.length);

    var sums = {};
    for (var i = 0; i < totalFlavoursWithCount.length; i++) {
      var obj = totalFlavoursWithCount[i];
      sums[obj.fid] = sums[obj.fid] === undefined ? 0 : sums[obj.fid];
      sums[obj.fid] += parseInt(obj.count);
    }

    console.log("FlavoursWithCount");
    console.log(sums);
    console.log(Object.values(sums));
    const pizzaResult = Object.values(sums).map(pizza => {
      if (pizza == "") {
        return "0";
      } else if (pizza < settings.slicesinpizza) {
        if (pizza === 1) {
          return pizza + " Slice";
        } else {
          return pizza + " Slices";
        }
      } else if (pizza === settings.slicesinpizza) {
        return pizza + " Pizza";
      } else {
        const fullpiza = Math.floor(pizza / settings.slicesinpizza);
        const slices = Math.floor(pizza % settings.slicesinpizza);
        return fullpiza + " full pizza with " + slices + " slices";
      }
    });

    console.log("pizzaResult");
    console.log(pizzaResult);
    return { pizza: pizzaResult };
  }
  render() {
    const { classes, spacing } = this.props;

    return (
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {this.state.pizza.map((pizzatext, index) => (
              <Grid key={index} item style={{ padding: "10px" }}>
                <Paper className={classes.paper}>
                  <h2>Flavour {index + 1}</h2>
                  <h3>{pizzatext}</h3>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

PizzaSummary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PizzaSummary);
