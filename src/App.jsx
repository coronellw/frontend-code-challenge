import React, { Component } from 'react';
import './App.css';

const URL_PATH = "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

class App extends Component {

  state = {
    pokemons: [],
    filteredValues: [],
    isLoading: true,
  }

  componentDidMount() {
    fetch(URL_PATH)
      .then(resp => resp.json())
      .then(pokemons => this.setState({ pokemons, filteredValues: pokemons, isLoading: false }))
      .catch(e => console.log(e))
  }

  searchPokemon = e => {
    const { pokemons } = this.state;
    let { value: searchItem } = e.target;
    searchItem = searchItem.toLowerCase();
    const regexp = new RegExp(searchItem, 'i');

    if (!searchItem) {
      this.setState({ filteredValues: pokemons });
      return;
    }

    const filteredValues = pokemons.filter(p => regexp.test(p.Name) || p.Types.some(t => regexp.test(t.toLowerCase())));

    this.setState({
      filteredValues: filteredValues.slice(0, 4).sort((a, b) => {
        if (regexp.test(a.Name) || regexp.test(b.Name)) {
          if (a.Name < b.Name) {
            return -1;
          }

          return 1;
        }
        return -2;
      })
    })
  }


  render() {
    const { filteredValues, isLoading } = this.state;
    const pokemonsElemnts = filteredValues.map(poke => (
      <li key={poke.Number}>
        <img src={poke.img} alt={poke.Name} />
        <div className="info">
          <h1>
            <span className="hl">{poke.Name}</span>
          </h1>
          {
            poke.Types.map((t, i) => <span key={i} className={`type ${t.toLowerCase()}`}>{t}</span>)
          }
        </div>
      </li>
    ));

    return (
      <>
        <label htmlFor="maxCP" className="max-cp">
          <input type="checkbox" id="maxCP" />
          <small>
            Maximum Combat Points
                </small>
        </label>
        <input type="text" className="input" placeholder="Pokemon or type" onKeyUp={this.searchPokemon} />

        {isLoading && <div className="loader"></div>}

        {!isLoading && <ul className="suggestions">
          {pokemonsElemnts.length === 0 && <li>
            <img src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png" alt="" />
            <div className="info">
              <h1 className="no-results">
                No results
                        </h1>
            </div>
          </li>}
          {pokemonsElemnts}
        </ul>}

      </>
    )
  }
}

export default App;
