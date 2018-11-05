import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import '../../App.css';


class Navbar extends Component{
    
    constructor(props){
        
        super(props);
        
      
    }


render(){

    return(
      <div>

      <nav class="navbar-light bg-light">
      <a class="navbar-brand" href="#">
      <img src="https://cdn.freebiesupply.com/logos/large/2x/homeaway-3-logo-png-transparent.png" width="100" height="40" class="d-inline-block align-top" alt=""/>
      </a>
          <div class="container-fluid">
              <div class="navbar-header">
                  <a class="navbar-brand" href="/login"><h1>HomeAway</h1></a>
              </div>
          </div>
      </nav>
   </div>

    )

}
}

export default Navbar;

