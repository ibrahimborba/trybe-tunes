import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import styles from './AlbumAndFavorites.module.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      collection: '',
      musicList: [],
      musicFavorites: [],
      loading: false,
      trackPage: 'album',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState(
      { loading: true },
      async () => {
        const album = await getMusics(id);
        const favorites = await getFavoriteSongs();
        const { artistName, collectionName, artworkUrl100 } = album[0];
        this.setState({
          artist: artistName,
          collection: collectionName,
          image: artworkUrl100,
          musicList: album,
          musicFavorites: [...favorites],
          loading: false,
        });
      },
    );
  }

  updateFavoritesList = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({
      musicFavorites: [...favorites],
    });
  }

  render() {
    const {
      artist, collection, musicList, musicFavorites, loading, trackPage, image,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section
          className={ styles.album }
        >
          <img
            src={ image }
            alt={ collection }
            className={ styles.album_img }
          />
          <div>
            <p
              data-testid="album-name"
              className={ styles.album_albumName }
            >
              {collection}
            </p>
            <p
              data-testid="artist-name"
              className={ styles.album_artistName }
            >
              {artist}
            </p>
          </div>
        </section>
        { loading && <Loading /> }
        <ul
          className={ styles.musicsList }
        >
          {musicList.slice(1).map((music) => (
            <li
              key={ music.trackId }
              className={ styles.musicsList_item }
            >
              <MusicCard
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                favoriteList={ musicFavorites }
                updateFavorites={ this.updateFavoritesList }
                trackPage={ trackPage }
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};

export default Album;
