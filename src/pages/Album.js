import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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
        const { artistName, collectionName } = album[0];
        this.setState({
          artist: artistName,
          collection: collectionName,
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
      artist, collection, musicList, musicFavorites, loading, trackPage,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{artist}</p>
        <p data-testid="album-name">{collection}</p>
        { loading && <Loading /> }
        <ul>
          {musicList.slice(1).map((music) => (
            <li key={ music.trackId }>
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
