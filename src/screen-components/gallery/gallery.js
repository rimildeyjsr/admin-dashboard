import React from 'react';
import './gallery.css';

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
              <div className='photo-block'></div>
            )
          })
        }
      </div>
    )
  }
}
