/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';
// import classnames from 'classnames';

import Article from './Article';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: '',
      nprSearchResults: [],
      bbcSearchResults: [],
      cnnSearchResults: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    // Set the searchQuery state
    this.setState({ searchQuery: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    // Clear search states if any
    this.setState({ nprSearchResults: [] });
    this.setState({ bbcSearchResults: [] });
    this.setState({ cnnSearchResults: [] });

    const newSearchQuery = {
      searchQuery: this.state.searchQuery
    };

    axios
      .post('/search', newSearchQuery)
      .then(res => {
        // Add new search results in state
        this.setState({ nprSearchResults: res.data.npr });
        this.setState({ bbcSearchResults: res.data.bbc });
        this.setState({ cnnSearchResults: res.data.cnn });
      })
      .catch(err => this.setState({ errors: err.response.data }));

    console.log('errors', this.state.errors);
  }

  render() {
    const isNprSet = this.state.nprSearchResults.length > 0 ? this.state.nprSearchResults : "No Matches";
    return (
      <div className="container">
        <div className="row">
          <h1 className="col s12 center-align">RSS Search</h1>
        </div>

        <div className="row">
          <form className="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">search</i>
                <input
                  value={this.state.searchQuery}
                  onChange={this.onChange}
                  name="searchQuery"
                  id="rss-search"
                  type="text"
                />
                <label htmlFor="rss-search">Search</label>
                <span className="helper-text" data-error="wrong" data-success="right">
                  Helper text
                </span>
              </div>
            </div>
          </form>
        </div>
        {/* Insert Found Articles here .... */}
        <h4>NPR News RSS</h4>
        <ul className="collection">
          {this.state.nprSearchResults.map((key, index) => (
            <Article key={index} details={key} />
          ))}
          {isNprSet}
        </ul>
        <h4>BBC News RSS</h4>
        <ul className="collection">
          {this.state.bbcSearchResults.map((key, index) => (
            <Article key={index} details={key} />
          ))}
        </ul>
        <h4>CNN RSS Feed</h4>
        <ul className="collection">
          {this.state.cnnSearchResults.map((key, index) => (
            <Article key={index} details={key} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Search;
