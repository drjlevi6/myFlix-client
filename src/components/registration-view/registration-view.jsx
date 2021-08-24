import React from 'react';
import { ReactDOM } from "react-dom";

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
          <table>
            <tbody>
              <tr>
                <td><label htmlFor='Username: '>Username:</label></td>
                <td><input type='text' name='Username' id='Username' required /></td>
              </tr>
              <tr>
                <td><label htmlFor='Password: '>Password:</label></td>
                <td><input type='text' name='Password' id='Password' required /></td>
              </tr>
              <tr>
                <td><label htmlFor='Email:'>Email:</label></td>
                <td><input type='text' name='Email' id='email' required /></td>
              </tr>
              <tr>
                <td><label htmlFor='Birthday:'>Birthday:</label></td>
                <td><input type='text' name='Birthday' id='Birthday' required /></td>
              </tr>
            </tbody> 
          </table>
          <div className='form-row'>
            <input type='submit' value='Submit'/>
          </div>
       </form>
       </div>
    ) // end return
  } // end render
} // end class
