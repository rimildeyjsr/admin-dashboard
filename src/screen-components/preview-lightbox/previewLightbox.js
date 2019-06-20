import React, {Component} from 'react';
import './previewLightbox.css';

class PreviewLightbox extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='preview-lightbox-wrapper'>
        <div className='preview-lightbox-inner'>
          <button onClick={this.props.closeLightBox}>Close PopUp</button>
          <img
            src={this.props.imageURL}
            className='preview-image'
          />
          <button onClick={this.props.updateImage}>Upload Image</button>
        </div>
      </div>
    )
  }
}

export default PreviewLightbox;
