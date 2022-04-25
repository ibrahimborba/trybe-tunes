import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import styles from './MusicCard.module.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { favoriteList, trackId } = this.props;
    if (favoriteList.some((favorite) => favorite.trackId === trackId)) {
      this.setState({ checked: true });
    } else {
      this.setState({ checked: false });
    }
  }

  handleChange = (event, checked) => {
    this.setState({ checked: event.target.checked, loading: true },
      async () => {
        const { trackName, previewUrl, trackId, updateFavorites, trackPage } = this.props;
        if (trackPage === 'favorites') {
          if (!checked) {
            await addSong({ trackName, previewUrl, trackId });
            await updateFavorites();
            this.setState({ loading: false });
          } else {
            await removeSong({ trackName, previewUrl, trackId });
            await updateFavorites();
          }
        }
        if (trackPage === 'album') {
          if (!checked) {
            await addSong({ trackName, previewUrl, trackId });
            await updateFavorites();
            this.setState({ loading: false });
          } else {
            await removeSong({ trackName, previewUrl, trackId });
            await updateFavorites();
            this.setState({ loading: false });
          }
        }
      });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { checked, loading } = this.state;
    return (
      <section
        className={ styles.card }
      >
        <span
          className={ styles.card_musicName }
        >
          {trackName}
        </span>
        <section
          className={ styles.card_audio }
        >
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorite">
            <input
              id="favorite"
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              checked={ checked }
              onChange={ (event) => { this.handleChange(event, checked); } }
            />
          </label>
        </section>
        { loading && <Loading /> }
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favoriteList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
  ])).isRequired,
  updateFavorites: PropTypes.func.isRequired,
  trackPage: PropTypes.string.isRequired,
};

export default MusicCard;
