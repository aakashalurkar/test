import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import Navbar from '.././Navbar/navbar';

import Button from '@material-ui/core/Button';
import { Route } from 'react-router-dom';
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createBook } from "../../actions";

// import { loginDetails } from "../../actions";


class Login extends Component {

    constructor(props) {

        super(props);

        this.state = {
            username: "",
            password: "",
            authFlag: false,
            redirect: false,
            owner: [],
            ownerkey: "",
            profile: ""

        }

        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        // this.submitLogin = this.submitLogin.bind(this);
    }

    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }

    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    //change
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }

    //   submitLogin = (values) =>{
    //     console.log(values);

    //     this.props.loginDetails(values, () => {
    //       this.props.history.push("/");
    //     });
    //   }
    // end change  
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(data)

        axios.defaults.withCredentials = true;

        axios.post('http://54.219.175.186:3001/ownerlogin', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                console.log(response.data.updatedList[0]._id)
                if (response.status === 200) {
                    this.setState({
                        authFlag: true,
                        owner: this.state.owner.concat(response.data)
                    })


                    console.log("Owner ")
                    console.log(this.state)
                    const data1 = {
                        username: this.state.username,
                        password: this.state.password,
                        ownerkey: response.data.updatedList[0]._id
                        //ownerkey : 2
                    }
                    this.setState({
                        redirect: true,
                        profile: data1
                    })
                } else {
                    this.setState({
                        authFlag: false
                    })
                }
                this.props.loginDetails(this.data1, () => {
                    this.props.history.push("/");
                });
            });

    }

    render() {
        const { redirect, profile } = this.state

        if (redirect)
            return (

                <Redirect to={{
                    pathname: '/ownerdashboard',
                    state: { profile: this.state.profile }
                }} />)



        return (
        
            <header class="loginhead">
          
                <div>

                    <div className="container">

                        <div className="login-form">
                            <div className="main-div">
                                <div className="panel">
                                <h2>LOGIN AS OWNER</h2>
                                    <h2>Need an account?
                                
                                            {/* <white-font> */}
                                            Sign Up Below!
                                        {/* </white-font> */}
                                   
                                    </h2>
                                    <p>Please enter your username and password</p>
                                </div>
                                <div className="form-group">
                                    {/* <input onChange = {this.usernameChangeHandler} type="text" className="form-control" name="username" placeholder="Username"/> */}
                                    <Field
                                        label="username"
                                        name="username"
                                        component={this.renderField}
                                        onChange={this.usernameChangeHandler}
                                    />

                                </div>
                                <div class="form-group">
                                    <Field
                                        label="password"
                                        name="password"
                                        component={this.renderField}
                                        onChange={this.passwordChangeHandler}
                                    />
                                    {/* <input onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password"/> */}
                                </div>
                                <Button onClick={this.submitLogin} variant="contained" color="primary">Login</Button> &nbsp;
                            {/* <Route render={({ history}) => (
            <Button variant="contained" color="primary" value ="Owner" onClick={() => { history.push({
      pathname:"/ownerdashboard",
      state:{
        username: this.state.username,
        password: this.state.password,
        
       }
      }); }}
>
                Login
            </Button>
             )} /> &nbsp; */}
                                <Route render={({ history }) => (
                                    <Button variant="contained" color="primary" value="Owner" onClick={() => {
                                        history.push({
                                            pathname: "/signupowner",
                                        });
                                    }}
                                    >
                                        Sign Up
            </Button>
                                )} />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

// export default Login;


export default reduxForm({
    destroyOnUnmount: false,
    form: "NewOwner"
})(connect(null)(Login));

//Change over here 
