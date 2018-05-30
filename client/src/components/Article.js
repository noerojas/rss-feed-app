/* eslint-disable */
import React, { Component } from 'react';

class Article extends Component {
  render() {
    const { title, content, link } = this.props.details;
    const contentEncoded = this.props.details["content:encoded"];
    const isSet = (contentEncoded) => {
      if (contentEncoded) {
        return contentEncoded;
      }
    }
    return (
      <li className="collection-item">
        <a href={link} target="_blank">
          <p>{title}</p>
        </a>
        <p dangerouslySetInnerHTML={{ __html: content }} />
        <p dangerouslySetInnerHTML={{ __html: isSet(contentEncoded) }} />
      </li>
    );
  }
}

export default Article;
