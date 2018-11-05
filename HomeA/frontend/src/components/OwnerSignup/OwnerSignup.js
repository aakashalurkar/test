import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Grid, Paper } from '@material-ui/core';
import Navbar from '../Navbar/navbar';
import { Link } from "react-router-dom";
import Image from '../../login.jpeg';
const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 13,

    direction: "column",
    justify: "space-evenly",
    alignItems: "center",
    borderTopWidth: 1, borderColor: 'black', borderStyle: 'solid', borderBottomWidth: 3,

  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 5,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});




class OwnerSignup extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      name: '',
      age: '',
      phoneno: '',
      city: '',
      password: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  handleClick = (e) => {
    // console.log(this.state)
    const data = {
      name: this.state.name,
      age: this.state.age,
      phoneno: this.state.phoneno,
      city: this.state.city,
      password: this.state.password,
    }

    axios.defaults.withCredentials = true;
    console.log(data);
    axios.post('http://localhost:3001/ownersignup', data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            authFlag: true

          })
          window.location = '/ownerlogin'
        } else {
          this.setState({
            authFlag: false
          })
        }
      });

  }






  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };




  render() {
    const { classes } = this.props;

    return (
      //  <form className={classes.container} noValidate autoComplete="off">
      // <Grid container className={classes.container}>
      // <Navbar />
      <div>
        <div className="ownersignup-bg">
          <div className="container">
            <div className="ows-div">

              <h1><b>MAXIMIZE YOUR EARNING POTENTIAL</b></h1>
              <br />
              <p><b>Sign up and host a property! Let's start with the basics.</b></p>
              <p>Please enter your details to continue</p>
              <br />
              <TextField
                id="standard-name"
                label="Username"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
              />
              <TextField
                id="standard-password-input"
                label="Password"
                className={classes.textField}
                type="password"
                value={this.state.password}
                onChange={this.handleChange('password')}
                margin="normal"
              />
              <TextField
                id="standard-phoneno"
                label="Phone Number"
                className={classes.textField}
                value={this.state.phoneno}
                onChange={this.handleChange('phoneno')}
                margin="normal"
              />

              <TextField
                id="standard-city"
                label="City"
                className={classes.textField}
                value={this.state.city}
                onChange={this.handleChange('city')}
                margin="normal"
              />
              <TextField
                id="standard-age"
                label="Age"
                value={this.state.age}
                onChange={this.handleChange('age')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
              <button class="btn btn-primary btn-lg btn-block" onClick={this.handleClick}>
                <Link to="/ownerlogin">
                  <white-font>SUBMIT</white-font>
                </Link>
              </button>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

OwnerSignup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OwnerSignup);
