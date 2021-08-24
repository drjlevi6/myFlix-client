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

          <form onSubmit={this.handleSubmit}>
            <div>
                    <label>Username:&nbsp;</label>
                      <input type="text" value={this.state.Username} 
                        onChange={this.onUsernameChange} /> 
            </div>
            <div>
                    <label>Password:&nbsp;</label>
                      <input type="password" value={this.state.Password} 
                      onChange={this.onPasswordChange} />
           </div>
            <input type="submit" />
          </form>
        </div>
      );// end return
    }; //end else
  }; // end render
} // end class LoginView

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
