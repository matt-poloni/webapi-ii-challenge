import React from 'react';
import axios from 'axios';
import './App.css';
import Posts from './components/Posts';

const baseURL = 'http://localhost:5000/api/posts'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    axios.get(baseURL)
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
