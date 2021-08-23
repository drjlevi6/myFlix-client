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
    this.setState({
      doRegister: true
    });
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
      alert("You clicked Register");
    } else {
      return (
        <div>
        <p>Login or 
          <button type="button" 
            onClick={this.onRequestToRegister}>
              Register
          </button>:
        </p>
        <form>
        <p>
          <label>
          Username:
            <input type="text" value={this.state.username} 
              onChange={this.onUsernameChange} />
          </label>
        </p>
        <p>
            <label>
            Password:
            <input type="password" value={this.state.password} 
              onChange={this.onPasswordChange} />
          </label>
        </p>
          <button type="button" onClick={this.handleSubmit}>Submit</button>
        </form>
        </div>
      );// end return
    }; //end else
  }; // end if
} // end render
