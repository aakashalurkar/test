import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Navbar from '.././Navbar/navbar';
import Cards from '../Cards/Cards';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import CardOwner from '../CardOwner/CardOwner';
import { connect } from "react-redux";
import { createBook } from "../../actions";

import { loginDetails } from "../../actions";
import CardMessage from '../CardMessage/CardMessage';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    position: 'fixed',
    top: '0',
    marginTop : '100px',
    
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop : '100px',

  },

 
});


class ShowProperty extends Component {
    constructor(){
        super();
        this.state = {
            message_list : [],
            username: "",
              password: "",
              ownerkey:""                 
        }

    }
    componentDidMount(){
        console.log("props")
        console.log(this.props)
        const data={
            username: this.props.location.state.username,
            password: this.props.location.state.password,
            ownerkey:this.props.location.state.ownerkey
          }

          this.setState({
            username: this.props.location.state.username,
            password: this.props.location.state.password,
           ownerkey:this.props.location.state.ownerkey
            });
          
      console.log(data)
      //     axios.get('http://54.219.175.186:3001/checkowner',{ params: { data: data}})
      //     .then((response) => {
      //       //console.log("Status Code : ",response.data);
      //       if(response.data === 400){
            
      //         window.location = "/login"
      //     }
      //   //   console.log("in get")
      //   //  console.log(response)
      //    this.setState({
      //       ownerkey :response.data[0].ownerkey
      //     });
           
          
          
      // });
      axios.get('http://54.219.175.186:3001/message',{ params: { data: data}})
              .then((response) => {
                //console.log("Status Code : ",response.data);
              //   if(response.data === 400){
                
              //     window.location = "/login"
              // }
              console.log("in get")
             console.log(response)
              this.loadData(response);
               
              
              
          });
          
         
         
  }
  loadData(response) {
    const data = JSON.stringify(response.data)
              
    this.setState({
      message_list : this.state.message_list.concat(response.data),
      //ownerkey :response.data[0].ownerkey
      });
}

    render(){
      
      console.log("key is"+this.state.ownerkey)
  const { classes, theme } = this.props;
   
     var arr3 = Object.values(this.state.message_list);
//   //   var arr4 =arr3[0]
//   //  // var arr5=Object.keys(arr4)
    console.log("arr3")
    console.log(this.state.message_list)
    console.log(arr3)
     
//     // console.log(this.state.message_list.length)
    var elements=[];
    for(var i=0;i<this.state.message_list.length;i++){
        
        elements.push(<CardMessage key={i} props={arr3[i]}/>);
    }
//     var h1="Your Listed Properties"
   

  
   

  return (
    <div> 
    <div className={classes.root}>
   
    <Navbar/>
     </div>
    <div>
    
    <Paper className={classes.paper} elevation={1}>
    <h3>Your Messages</h3>
    <Route render={({ history}) => (
            <Button variant="contained" color="primary" value ="Owner" onClick={() => { history.push({
      pathname:"/ownerdashboard",
      state:{profile:{
        ownerkey: this.state.ownerkey,
        username: this.state.username,
            password: this.state.password,
      }
       }
      }); }}
>
               Dashboard
            </Button>
             )} />
                
    {elements}
    </Paper>
    </div>
    </div>
   
     
  );
}
}

ShowProperty.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


// export default reduxForm({

//   form: "NewOwner"
// })(connect(null, { loginDetails })(Login));

export default withStyles(styles, { withTheme: true })(connect(null,{loginDetails})(ShowProperty));