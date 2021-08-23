import React from 'react';
import { RegistrationView } from '../registration-view/registration-view';

export class LoginView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      doRegister: false // open registration window instead of logging in?
    };


    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onRequestToRegister = this.onRequestToRegister.bind(this);
  }

  onRequestToRegister() {
    this.doRegister = true;
    this.setState({});
  }
  onUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit() {
    const { username, password } = this.state;
    /* Send a request to the server for authentication */
    /* then call this.props.onLoggedIn(username) */
    this.props.onLoggedIn(username);
  }

  render() {
    if (this.doRegister) {
      return (
        <div>
          <RegistrationView 
            Username = ''
            Password = ''
            Email = ''
            Birthday = ''
          /> 
        </div>
      )
    } else {
      return (
        <div>

          <span><h3>Log in or&nbsp;
          <button className="register-button"  
            onClick={this.onRequestToRegister}><strong>register:</strong>
          </button>
          </h3>
          </span>

          <form>
            <tbody>
              <tr>
                <td>
                  <label>Username:&nbsp;</label>
                </td>
                <td>
                    <input type="text" value={this.state.username} 
                      onChange={this.onUsernameChange} /> 
                </td>
              </tr>
              <tr>
                <td>
                  <label>Password:&nbsp;</label>
                </td>
                <td>
                    <input type="password" value={this.state.password} 
                      onChange={this.onPasswordChange} />
                </td>
              </tr>
            </tbody>
            <button type="button" onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>
      );// end return
    }; //end else
  }; // end render
} // end class LoginView
