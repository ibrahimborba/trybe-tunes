import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import styles from './AlbumAndFavorites.module.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      musicFavorites: [],
      loading: false,
      trackPage: 'favorites',
    };
  }

  componentDidMount() {
    this.setState(
      { loading: true },
      async () => {
        const favorites = await getFavoriteSongs();
        this.setState({
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
    const { musicFavorites, loading, trackPage } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <ul
          className={ styles.musicsList }
        >
          {musicFavorites.map((music) => (
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
        { loading && <Loading /> }
      </div>
    );
  }
}

export default Favorites;
