/* eslint-disable */
import React, { Component } from 'react';

class Article extends Component {
  render() {
    const { title, content, link } = this.props.details;
    return (
      <li className="collection-item">
        <a href={link} target="_blank">
          <p>{title}</p>
        </a>
        <p dangerouslySetInnerHTML={{ __html: content }} />
      </li>
    );
  }
}

export default Article;
