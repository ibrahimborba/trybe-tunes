import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      username: '',
    };
  }

  componentDidMount() {
    this.setState(
      async () => {
        const { name } = await getUser();
        this.setState({
          loading: false,
          username: name,
        });
      },
    );
  }

  render() {
    const { loading, username } = this.state;
    const usernameLogged = <p data-testid="header-user-name">{username}</p>;
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : usernameLogged }
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
