import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

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
            <section>
              <p>{userName}</p>
              <p>{userEmail}</p>
              <p>{userDescription}</p>
              <img data-testid="profile-image" src={ imageUrl } alt={ userName } />
              <Link to="/profile/edit">Editar perfil</Link>
            </section>
          )}
      </div>
    );
  }
}

export default Profile;
