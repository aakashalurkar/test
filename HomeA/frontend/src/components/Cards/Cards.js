import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import cookie from 'react-cookies';
import { TextField } from '@material-ui/core';
const styles = theme => ({
  card: {
    display: 'flex',

    height:'auto',
    padding:'1%',
    maxWidth:'600'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    
    height: 200,
    width:200
  },
  controls: {
    display: 'flex',
   
   
  },
 
});


class Cards extends Component {
    constructor(){
        super();
        this.state = {
          property_list : [],
          ownerkey:"",
          propertykey:"",
          traverllerkey:"" ,
          multiline: 'Message',            
        }
        this.Bookit = this.Bookit.bind(this);
        this.Message = this.Message.bind(this);
    }
   
componentDidMount(){
  // var cookieload=cookie.load('cookie')
  // var getdata=cookies.get('username')
  console.log("card in search")
  console.log(this.props)
  // var arr6 = Object.keys(cookieload);
 // console.log(arr6)
 // var a=cookieload[18]
   //console.log(a)
   //
}
handleChange = name => event => {
  this.setState({
    [name]: event.target.value,
  });
};

    Bookit = (e) => {
   console.log("in Bookit")
    console.log(this.props)
    console.log(this.props.travellerkey)
   var  propertykey =this.props.props._id
   var ownerkey =this.props.props.ownerkey
   var traverllerkey =this.props.travellerkey
      const data={
        propertykey,ownerkey,traverllerkey
       
      }
     console.log(data)
      axios.defaults.withCredentials = true;

      axios.post('http://localhost:3001/bookproperty',data)
          .then(response => {
              console.log("Status Code : ",response.status);
              if(response.status === 200){
                  this.setState({
                      authFlag : true
                  })
                  
              }else{
                  this.setState({
                      authFlag : false
                  })
              }
          });
  }    

  Message = (e) => {
    console.log("in message")
     console.log(this.props)
     console.log(this.state)
     console.log(this.props.travellerkey)
    var  propertykey =this.props.props._id
    var ownerkey =this.props.props.ownerkey
    var traverllerkey =this.props.travellerkey
    var message=this.state.multiline
       const data={
         propertykey,ownerkey,traverllerkey,message
        
       }
       console.log(data)
       axios.post('http://localhost:3001/message',data)
       .then(response => {
           console.log("Status Code : ",response.status);
           if(response.status === 200){
               this.setState({
                   authFlag : true
               })
               
           }else{
               this.setState({
                   authFlag : false
               })
           }
       });
      }
         
  

    render(){
      
     //console.log(this.props.props)
  const { classes, theme } = this.props;


  return (
   
<Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image="https://images.pexels.com/photos/259646/pexels-photo-259646.jpeg?auto=compress&cs=tinysrgb&h=350"
          title="Property"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography gutterBottom component="h1" variant="headline">
              <h2>          {this.props.props.headline}</h2>
            </Typography>
            <Typography component="p">
              <h4>
                {this.props.props.property_description}
              </h4>
            </Typography>
            <Typography gutterBottom align="left" variant="h1" >
              <h3>
                ${this.props.props.nightly_rate} / night
                &nbsp;&nbsp;    &nbsp;&nbsp;
            </h3>
            </Typography>
            <Typography variant="subheading" >
              <b><h4>
                {this.props.props.bedroom} Bedrooms
                <br />
          {this.props.props.bathroom} Bathrooms
          <br />
              </h4>
              </b>
             
              <h4>
                Accomodates  {this.props.props.accomodates}
                <br/><br/>
              </h4>
            </Typography>
            <CardActions >
              <Button variant="outlined"
                color="primary"
                size="large" onClick={this.Bookit} >
                BOOK PROPERTY
        </Button>
            </CardActions>
          </CardContent>
        </div>
      </Card>
  );

}
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Cards);