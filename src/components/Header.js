import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import styles from './Header.module.css';
import logo from '../images/logoHeader.svg';

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
    const usernameLogged = (
      <Link
        to="/profile"
        className={ styles.mainContainer_user }
      >
        <p data-testid="header-user-name">
          {username}
        </p>
      </Link>
    );
    return (
      <header
        data-testid="header-component"
        className={ styles.header }
      >
        <section
          className={ styles.header_mainContainer }
        >
          <Link
            to="/"
          >
            <img
              src={ logo }
              alt='trybetunes logo'
              className={ styles.mainContainer_logo }
            />          
          </Link>
          { loading ? <Loading /> : usernameLogged }
        </section>
        <section
          className={ styles.header_navContainer }
        >
          <nav
            className={ styles.navContainer_nav }
          >
            <Link
              data-testid="link-to-search"
              to="/search"
              className={ styles.navContainer_nav_link }
            >
              Search
            </Link>
            <Link
              data-testid="link-to-favorites"
              to="/favorites"
              className={ styles.navContainer_nav_link }
            >
              Favorites
            </Link>
            <Link
              data-testid="link-to-profile"
              to="/profile"
              className={ styles.navContainer_nav_link }
            >
              Profile
            </Link>
          </nav>
        </section>
      </header>
    );
  }
}

export default Header;
