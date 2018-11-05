import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    width: 200
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
});

class PricingComponent extends React.Component {
  state = {
    startdate: "",
    enddate: "",
    nightrate: "",
    minimumstay: ""
  };

  componentDidMount() {
    this.setState({
      startdate: "",
      enddate: ""
    });
  }

  submitPricing = e => {
    //prevent page from refresh
    e.preventDefault();

    const data = {
      startdate: this.state.startdate,
      enddate: this.state.enddate,
      nightrate: this.state.nightrate,
      minimumstay: this.state.minimumstay
    };
    // console.log(data);

    this.props.pricingChangeHandler(data);
    this.props.handleSubmit();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    // console.log("props " + JSON.stringify(this.props));
    const { classes } = this.props;
    //console.log("props" + JSON.stringify(classes));
    return (
      <div>
        <form className={classes.container}>
          <div className="container">
            <div className="ows-div">

              <input type="date"
                id="date"
                label="Start Date"
                type="date"
                ddefaultValue="0000-00-00"
                class="form-control"
                // className={classes.textField}
                value={this.props.startdate}
                onChange={this.handleChange("startdate")}
                InputLabelProps={{
                  shrink: true
                }}
                placeholder="Start Date"
              />
              <br />
              <input type="date"
                id="date"
                label="End Date"
                type="date"
                defaultValue="0000-00-00"
                class="form-control"
                // className={classes.textField}
                value={this.props.enddate}
                onChange={this.handleChange("enddate")}
                InputLabelProps={{
                  shrink: true
                }}
                placeholder="End Date"
              />
              <br />
              <input type="text"
                id="standard-nightrate"
                label="Nightly Rate"
                class="form-control"
                // className={classes.textField}
                value={this.props.nightrate}
                onChange={this.handleChange("nightrate")}
                margin="normal"
                placeholder="Cost Per Night"
              />
              <br />
              <input type="text"
                id="standard-minimumstay"
                label="Minimum Stay"
                class="form-control"
                // className={classes.textField}
                value={this.props.minimumstay}
                onChange={this.handleChange("minimumstay")}
                margin="normal"
                placeholder="Number of Days to Stay"
              />
              <br /><br />
              <Button
                variant="outlined"
                color="primary"
                size="large"
                className={classes.button}
                onClick={this.submitPricing}
              >
                Submit
          </Button>
            </div></div>
        </form>
      </div>
    );
  }
}

PricingComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PricingComponent);