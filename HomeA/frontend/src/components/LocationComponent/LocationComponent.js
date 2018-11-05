import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//import PricingProperty from "./PricingProperty";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

//import DetailsProperty from "./DetailsProperty";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 5
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});
class LocationComponent extends React.Component {
  state = {
    country: "",
    street_address: "",
    unit: "",
    city: "",
    statelive: "",
    zipcode: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  onClick = event => {
    //console.log("on click");
    //console.log(this.state);
    const data = {
      country: this.state.country,
      street_address: this.state.street_address,
      unit: this.state.unit,
      city: this.state.city,
      statelive: this.state.statelive,
      zipcode: this.state.zipcode
    };
    // console.log(data);
  };

  submitDescription = e => {
    //prevent page from refresh
    e.preventDefault();

    const data = {
      country: this.state.country,
      street_address: this.state.street_address,
      unit: this.state.unit,
      city: this.state.city,
      statelive: this.state.statelive,
      zipcode: this.state.zipcode
    };
    //console.log(data);

    this.props.locationChangeHandler(data);
    this.props.handleNext();
  };

  render() {
    const { classes } = this.props;

    return (
      // <form className={classes.container}>
      <div className="container">
        <div className="ows-div">

      <input type="text"
            id="standard-name"
            label="Country"
            class="form-control"
            // className={classes.textField}
            value={this.state.country}
            onChange={this.handleChange("country")}
            margin="normal"
            value={this.props.country}
            placeholder="Country"
          />
          <br />
          <input type="text"
            id="standard-street_address"
            label="Street Address"
            class="form-control"
            // className={classes.textField}
            value={this.state.street_address}
            onChange={this.handleChange("street_address")}
            margin="normal"
            value={this.props.street_address}
            placeholder="Address"
          />
          <br />

          <input type="text"
            id="standard-name"
            id="standard-unit"
            label="Unit, Suite Buiding, Etc"
            class="form-control"
            // className={classes.textField}
            value={this.state.unit}
            onChange={this.handleChange("unit")}
            margin="normal"
            value={this.props.unit}
            placeholder="Unit Number"
          />
          <br />
          <input type="text"
            id="standard-city"
            label="City"
            class="form-control"
            // className={classes.textField}
            value={this.state.city}
            onChange={this.handleChange("city")}
            margin="normal"
            value={this.props.city}
            placeholder="City"
          />
          <br />
          <input type="text"
            id="standard-state"
            label="State"
            class="form-control"
            // className={classes.textField}
            value={this.state.statelive}
            onChange={this.handleChange("statelive")}
            margin="normal"
            value={this.props.statelive}
            placeholder="State"
          />
          <br />
          <input type="text"
            id="standard-zip_code"
            label="Zipcode"
            class="form-control"
            // className={classes.textField}
            value={this.state.zipcode}
            onChange={this.handleChange("zipcode")}
            margin="normal"
            value={this.props.zipcode}
            placeholder="Zip Code"
          />
          <br /><br />
          <Button
            variant="outlined"
            color="primary"
            size="large"
            className={classes.button}
            onClick={this.submitDescription}
          >
            Save
        </Button>
        </div>

      </div>

    );
  }
}

LocationComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LocationComponent);