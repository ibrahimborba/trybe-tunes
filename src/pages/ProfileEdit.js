import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import styles from './ProfileEdit.module.css';
import profile from '../images/profile.svg'

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userName: '',
      userEmail: '',
      userDescription: '',
      imageUrl: '',
      disableBtn: true,
    };
  }

  componentDidMount() {
    this.setState(
      async () => {
        const { name, email, description, image } = await getUser();
        this.setState({
          loading: false,
          userName: name,
          userEmail: email,
          userDescription: description,
          imageUrl: image,
        }, () => { this.verifyProfileForm(); });
      },
    );
  }

  verifyProfileForm = () => {
    const { userName, userEmail, userDescription, imageUrl } = this.state;
    if (userName.length > 0
       && userEmail.length > 0
       && userDescription.length > 0
       && imageUrl.length > 0
    ) {
      this.setState({
        disableBtn: false,
      });
    } else {
      this.setState({
        disableBtn: true,
      });
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => { this.verifyProfileForm(); });
  };

  handleSubmit = (event, userInfo) => {
    event.preventDefault();
    const { history } = this.props;
    const { userName, userEmail, userDescription, imageUrl } = userInfo;
    this.setState(
      { loading: true },
      async () => {
        await updateUser({
          name: userName,
          email: userEmail,
          image: imageUrl,
          description: userDescription,
        });
        history.push('/profile');
      },
    );
  }

  render() {
    const {
      loading, userName, userEmail, userDescription, imageUrl, disableBtn,
    } = this.state;
    const userInfo = { userName, userEmail, userDescription, imageUrl };
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading
          ? (<Loading />)
          : (
            <form
              className={ styles.form }
            >
              <section
                className={ styles.form_imageContainer }
              >
                <img
                  data-testid="profile-image"
                  src={ !imageUrl ? imageUrl : profile }
                  alt={ userName }
                  className={ styles.imageContainer_image }
                />
                <input
                  data-testid="edit-input-image"
                  value={ imageUrl }
                  name="imageUrl"
                  type="text"
                  onChange={ this.handleChange }
                  className={ styles.form_imageInput }
                  placeholder="url da imagem"
                />
              </section>
              <input
                data-testid="edit-input-name"
                value={ userName }
                name="userName"
                type="text"
                onChange={ this.handleChange }
                className={ styles.form_input }
                placeholder="Nome"
              />
              <input
                data-testid="edit-input-email"
                value={ userEmail }
                name="userEmail"
                type="email"
                onChange={ this.handleChange }
                className={ styles.form_input }
                placeholder="usuario@email.com"
              />
              <input
                data-testid="edit-input-description"
                value={ userDescription }
                name="userDescription"
                type="textarea"
                onChange={ this.handleChange }
                className={ styles.form_input }
                placeholder="Descrição"
              />
              <button
                data-testid="edit-button-save"
                type="submit"
                disabled={ disableBtn }
                onClick={ (event) => { this.handleSubmit(event, userInfo); } }
                className={ styles.save_btn }
              >
                Salvar
              </button>
            </form>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};

export default ProfileEdit;
