import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: '',
      prevSearch: '',
      disableBtn: true,
      loading: false,
      albumList: [],
    };
  }

  verifySearchLength = () => {
    const MIN_SEARCH_LENGTH = 2;
    const { searchValue } = this.state;
    if (searchValue.length >= MIN_SEARCH_LENGTH) {
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
    this.setState({
      searchValue: target.value,
    }, () => { this.verifySearchLength(); });
  }

  handleSubmit = (searchValue) => {
    this.setState(
      { loading: true, prevSearch: searchValue },
      async () => {
        const searchResult = await searchAlbumsAPI(searchValue);
        this.setState({
          searchValue: '',
          loading: false,
          albumList: [...searchResult],
        });
      },
    );
  }

  render() {
    const { searchValue, disableBtn, loading, albumList, prevSearch } = this.state;
    const resultMessage = <p>{`Resultado de álbuns de: ${prevSearch}`}</p>;
    const errorMessage = <p>Nenhum álbum foi encontrado</p>;
    const searchForm = (
      <form>
        <input
          data-testid="search-artist-input"
          value={ searchValue }
          onChange={ this.handleChange }
        />
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ disableBtn }
          onClick={ () => { this.handleSubmit(searchValue); } }
        >
          Pesquisar
        </button>
      </form>);
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : searchForm }
        {
          albumList.length > 0
            ? (
              <div>
                {resultMessage}
                <ul>
                  {albumList.map((album) => (
                    <li key={ `${album.artistId} ${album.collectionId}` }>
                      <Link
                        data-testid={ `link-to-album-${album.collectionId}` }
                        to={ `/album/${album.collectionId}` }
                      >
                        {album.collectionName}
                      </Link>
                    </li>))}
                </ul>
              </div>
            )
            : (
              errorMessage
            )
        }
      </div>
    );
  }
}

export default Search;
