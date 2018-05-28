import React from 'react';

const Search = () => (
  <div className="container">
    <div className="row">
      <h1 className="col s12 center-align">RSS Search</h1>
    </div>

    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">search</i>
            <input id="rss-search" type="text" className="" />
            <label htmlFor="rss-search">Search</label>
            <span className="helper-text" data-error="wrong" data-success="right">
              Helper text
            </span>
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default Search;
