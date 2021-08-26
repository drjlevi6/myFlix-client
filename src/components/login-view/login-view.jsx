import React from 'react';
import { RegistrationView } from '../registration-view/registration-view';
import PropTypes from 'prop-types';
import "./login-view.scss";
import "../button/button.scss"; // Use for custom-styled submit buttons

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
    this.setState({doRegister: !this.state.doRegister});
  }

  onUsernameChange(event) {
    this.setState({
      Username: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      Password: event.target.value
    });
  }

  componentWillUnmount() {
    this.doRegister = false; // go back to submitting the data
  }

  handleSubmit() {
    const { Username, Password } = this.state;
    /* Send a request to the server for authentication */
    /* then call this.props.onLoggedIn(username) */
    this.props.onLoggedIn(Username);
  }

  render() {
    const { login, handleSubmit, onRequestToRegister} = this.props;
    if (this.state.doRegister) {
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

          <div className="flexContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="text-row">
                    <label>Username:</label>
                      <input className="text-field" type="text" value={this.state.Username} 
                        onChange={this.onUsernameChange} /> 
            </div>
            <div className="text-row">
                    <label>Password:</label>
                      <input className="text-field" type="password" 
                        value={this.state.Password} onChange={this.onPasswordChange} />
            </div>
            <div className="button-row">
              <input className="submit-input custom-submit-button" type="submit" value="Submit" />
            </div>
          </form>
          </div>
        </div>
      );// end return
    }; //end else
  }; // end render
} // end class LoginView

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
