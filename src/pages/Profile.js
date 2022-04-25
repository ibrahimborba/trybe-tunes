import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import styles from './Profile.module.css';
import profile from '../images/profile.svg'

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userName: '',
      userEmail: '',
      userDescription: '',
      imageUrl: '',
    };
  }

  componentDidMount() {
    this.setState(
      async () => {
        const { name, email, description, image } = await getUser();
        console.log(getUser());
        this.setState({
          loading: false,
          userName: name,
          userEmail: email,
          userDescription: description,
          imageUrl: image,
        });
      },
    );
  }

  render() {
    const { loading, userName, userEmail, userDescription, imageUrl } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading
          ? (<Loading />)
          : (
            <section
              className={ styles.profileContainer }
            >
              <section
                className={ styles.profileContainer_nonText }
              >
                <img
                  data-testid="profile-image"
                  src={ imageUrl ? imageUrl : profile }
                  alt={ userName }
                  className={ styles.profileContainer_nonText_image }
                />
                <Link
                  to="/profile/edit"
                  className={ styles.profileContainer_nonText_btn }
                >
                  Editar perfil
                </Link>
              </section>
              <p
                className={ styles.profileContainer_textTitle }
              >Nome</p>
              <p
                className={ styles.profileContainer_text }
              >{userName}</p>
              <p
                className={ styles.profileContainer_text }
              >{userEmail}</p>
              <p
                className={ styles.profileContainer_text }
              >{userDescription}</p>
            </section>
          )}
      </div>
    );
  }
}

export default Profile;
