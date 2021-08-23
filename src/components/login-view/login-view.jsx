import React from 'react';
import { RegistrationView } from '../registration-view/registration-view';

export class LoginView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    openRegistrationWindow = false; // open registration window instead of logging in?

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    return (
      <div>
      <p>Login or register:</p>
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
    );
  }
}
