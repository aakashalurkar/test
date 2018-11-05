import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '.././Navbar/navbar';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import '../../App.css';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      //color: theme.palette.text.secondary,
      marginTop : theme.spacing.unit * 40,
     // marginLeft : theme.spacing.unit * 40,
      marginRight : theme.spacing.unit * 15,
    },
  });

class StartPage extends Component{
    
    constructor(props){
        
        super(props);
        
      
    }


render(){
    
    const { classes } = this.props;
    return(
        <div >
        <div className="HomeAway-bg">
            <div className="container">
                <div className="landing-div">
    {/* <div className="logincheck"> */}
       <h1>
       <white-font>Log in to HomeAway</white-font>
       </h1> 
       <br /><br /><br />
   <Route render={({ history }) => (
            // <Button variant="contained" color="primary" value="Owner" className={classes.paper} onClick={() => { history.push('/ownerlogin') }}>
            //     Owners Login
            // </Button>

            <button type="button" class="btn btn-primary btn-lg btn-block" onClick={() => { history.push('/ownerlogin') }}><h4>OWNER LOGIN</h4></button>
        )} />
<br /><br /><br />
        <Route render={({ history }) => (
            <button type="button" class="btn btn-success btn-lg btn-block" onClick={() => { history.push('/travellerlogin') }}><h4>TRAVELLER LOGIN</h4></button>
        //     <Button variant="contained" color="secondary" value="Owner" className={classes.paper} onClick={() => { history.push('/travellerlogin') }}>
        //         Travellers Login
        // </Button>
        )} />

                  </div>
        </div>
    </div>
    </div>

    )

}
}

StartPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(StartPage);


