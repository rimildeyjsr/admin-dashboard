import React from 'react';
import './gallery.css';
import Photo from '../photo/Photo';

class Gallery extends React.component {

  photos = [];

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='gallery-component'>
        {
          this.photos.map((photo) => {
            return(
              <Photo></Photo>
            )
          })
        }
      </div>
    )
  }
}

export default Gallery;
