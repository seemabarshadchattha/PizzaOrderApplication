import React, { Component } from "react";
import { Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import store from "./Redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

const styles = (theme: Theme) => ({
  card: {
    maxWidth: 345,
    display: "inline-block"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class SelectFlavours extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flavours: []
    };
  }
  static getDerivedStateFromProps(props, state) {
    const { persons } = store.getState();
    const person = persons.find(k => {
      if (props.pid == k.personid) {
        return k;
      }
    });

    const flavours = person && person.flavours ? person.flavours : [];
    return {
      flavours: flavours
    };
  }
  componentDidUpdate() {
    console.log("componentDidUpdate call in person");
  }
  addSlice = fid => {
    const { persons, settings } = store.getState();
    const totalSlices = this.state.flavours.reduce(
      (acc, item) => (acc += item.count),
      0
    );
    if (totalSlices < settings.slicesperperson) {
      const updateflavour = this.state.flavours.map(flavour => {
        if (flavour.fid == fid) {
          flavour.count += 1;
        }
        return flavour;
      });
      this.setState({ flavours: updateflavour });
      store.dispatch({ type: "INCREMENT", persons });
    }
  };
  subSlice = fid => {
    const { persons, settings } = store.getState();
    const subflavour = this.state.flavours.find(flavour => {
      if (flavour.fid == fid) {
        return flavour;
      }
    });
    if (subflavour.count > 0) {
      const updateflavour = this.state.flavours.map(flavour => {
        if (flavour.fid == fid) {
          flavour.count -= 1;
        }
        return flavour;
      });
      this.setState({ flavours: updateflavour });
      store.dispatch({ type: "DECREMENT", persons });
    }
  };

  render() {
    const { classes } = this.props;
    return this.state.flavours.map((flavour, index) => {
      return (
        <div style={{ display: "inline-block" }} key={flavour.pid}>
          <Card key={index} className={classes.card} style={{ margin: 50 }}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {flavour.count}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={flavour.name}
              subheader="Nov 30, 2019"
            />
            <CardMedia
              className={classes.media}
              image={require("../images/first.jpeg")}
              title="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Pizza is a savory dish of Italian origin, consisting of a
                usually round, flattened base of leavened wheat-based dough
                topped with tomatoes, cheese.
              </Typography>
            </CardContent>
          </Card>
          <div className="row">
            <div className="col-md-12">
              <Button
                size="medium"
                variant="contained"
                color="secondary"
                onClick={() => this.subSlice(flavour.fid)}
              >
                -
              </Button>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                style={{ marginLeft: "10px" }}
                onClick={() => this.addSlice(flavour.fid)}
              >
                +
              </Button>
            </div>
          </div>
        </div>
      );
    });
  }
}

SelectFlavours.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectFlavours);
