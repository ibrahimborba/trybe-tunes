import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      disableBtn: true,
      loading: false,
    };
  }

  verifyUsernameLength = () => {
    const MIN_NAME_LENGTH = 3;
    const { username } = this.state;
    if (username.length >= MIN_NAME_LENGTH) {
      this.setState({
        disableBtn: false,
      });
    }
  }

  handleChange = ({ target }) => {
    this.setState({
      username: target.value,
    }, () => { this.verifyUsernameLength(); });
  }

  handleSubmit = (event, username) => {
    event.preventDefault();
    const { history } = this.props;

    this.setState(
      { loading: true },
      async () => {
        await createUser({ name: `${username}` });
        history.push('/search');
      },
    );
  }

  render() {
    const { username, disableBtn, loading } = this.state;
    return (
      <div data-testid="page-login">
        <form onSubmit={ (event) => { this.handleSubmit(event, username); } }>
          <input
            data-testid="login-name-input"
            value={ username }
            onChange={ this.handleChange }
          />
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ disableBtn }
          >
            Entrar
          </button>
        </form>
        { loading && <Loading /> }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};

export default Login;
