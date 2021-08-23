import React from 'react';
//import { ReactDOM } from "react-dom";

export default class RegistrationView extends React.Component {
    constructor(){
      super();
      this.state = {
        Username: null,
        Password: null,
        Email: null,
        Birthday: null
      }; // end this.state
    } // end constructor

    render() {
        alert("registration-view.jsx");
        return null;
    } //end render
} // end class
