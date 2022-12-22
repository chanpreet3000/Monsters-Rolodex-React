import { Component } from 'react';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      search_field: "",
    }
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        return response.json()
      })
      .then((users) => {
        this.setState(() => {
          return {
            monsters: users
          }
        },
          () => {
            console.log(this.state)
          })
      })
  }
  onSearch = (event) => {
    this.setState({
      search_field: event.target.value
    })
  }
  render() {
    const { monsters, search_field } = this.state
    const { onSearch } = this

    const lower_case_search = search_field.toLocaleLowerCase()
    const filtered_monsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(lower_case_search)
    })

    return (
      <div className="App">
        <h1 className='app-header'>Monsters Rolodex</h1>
        <SearchBox className='monsters-search-box'
          placeholder='Search Monsters'
          onChangeHandler={onSearch} />
        <CardList monsters={filtered_monsters} />
      </div>
    );
  }
}

export default App;
