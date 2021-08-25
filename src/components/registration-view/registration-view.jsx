import React from 'react';
import { ReactDOM } from "react-dom";
import "./registration-view.scss"

export class RegistrationView extends React.Component {
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
    return (
      <div>
        <h3>Register for myFlix:</h3>
          <form action='' method='get' className='registration-form'>
            <div className="text-input-row">
              <label htmlFor='Username: '>Username:</label>
              <input type='text' name='Username' id='Username' required />
            </div>
            <div className="text-input-row">
              <label htmlFor='Password: '>Password:</label>
              <input type='text' name='Password' id='Password' required />
            </div>
            <div className="text-input-row">
              <label htmlFor='Email:'>Email:</label>
              <input type='text' name='Email' id='email' required />
            </div>
            <div className="text-input-row">
              <label htmlFor='Birthday:'>Birthday:</label>
              <input type='text' name='Birthday' id='Birthday' required />
            </div>
            <div className='submit-row'>
              <input type='submit' value='Submit'/>
            </div>
          </form>
        </div>
    ) // end return
  } // end render
} // end class
