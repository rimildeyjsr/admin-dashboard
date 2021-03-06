import React, {Component} from 'react';
import './previewLightbox.css';
import crossButton from '../../images/cross-button.png';
import CircularIndeterminate from "../circular-progress/circularProgress";

class PreviewLightbox extends Component {
  render() {
    return (
      <div className='preview-lightbox-wrapper'>
        <div className='preview-lightbox-inner'>
          <img
            onClick={this.props.closeLightBox}
            src={crossButton}
            alt='Cross button image'
            className='cross-button'
          />
          <div className='preview-image-div'>
            <img
              src={this.props.imageURL}
              className='preview-image'
            />
          </div>
          <CircularIndeterminate showUploadProgress={this.props.showUploadProgress}/>
          <button
            className='upload-button'
            onClick={this.props.updateImage}
          >
            UPLOAD
          </button>
        </div>
      </div>
    )
  }
}

export default PreviewLightbox;
