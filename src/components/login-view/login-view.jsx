import React from 'react';
import { RegistrationView } from '../registration-view/registration-view';
import PropTypes from 'prop-types';

export class LoginView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: '',
      Password: '',
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

  componentWillUnmount() {
    this.doRegister = false; // go back to submitting the data
  }

  handleSubmit() {
    const { username, password } = this.state;
    /* Send a request to the server for authentication */
    /* then call this.props.onLoggedIn(username) */
    this.props.onLoggedIn(username);
  }

  render() {
    const { login, handleSubmit, onRequestToRegister} = this.props;
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

          <form onSubmit={this.this.handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Username:&nbsp;</label>
                  </td>
                  <td>
                      <input type="text" value={this.state.Username} 
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
            </table>
            <button type="button" onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>
      );// end return
    }; //end else
  }; // end render
} // end class LoginView

LoginView.propTypes = {
  login: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onRequestToRegister: PropTypes.func.isRequired
};
