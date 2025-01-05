import React, { Component } from 'react';

class MediaDisplay extends Component {
  render() {
    const { mediaUrl } = this.props;
    return (
      <div>
        <img src={mediaUrl} alt="Uploaded Media" />
      </div>
    );
  }
}

export default MediaDisplay;
