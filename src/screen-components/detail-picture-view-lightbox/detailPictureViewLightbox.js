import React, {Component} from 'react';
import './detailPictureViewLightbox.css';
import crossButton from "../../images/cross-button.png";
import CircularIndeterminate from "../circular-progress/circularProgress";

export default function DetailPictureViewLightbox(props) {
  return (
    <div className='preview-lightbox-wrapper'>
      <div className='preview-lightbox-inner'>
        <img
          onClick={props.closeLightBox}
          src={crossButton}
          alt='Cross button image'
          className='cross-button'
        />
        <div className='preview-image-div'>
          <img
            src={props.imageURL}
            className='preview-image'
          />
        </div>
        <CircularIndeterminate showDeleteProgress={props.showDeleteProgress}/>
        <button
          className='delete-button'
          onClick={props.deleteImage}
        >
          DELETE
        </button>
      </div>
    </div>
  )
}
