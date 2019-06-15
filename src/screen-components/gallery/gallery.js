import React, {Component} from 'react';
import './gallery.css';
import Photo from '../photo/photo';
import cure from '../../dummy-data/images/curology-1540938-unsplash.jpg';
import david from '../../dummy-data/images/david-lundgren-1677087-unsplash.jpg';
import harley from '../../dummy-data/images/harley-davidson-1628439-unsplash.jpg';
import karly from '../../dummy-data/images/karly-gomez-1561494-unsplash.jpg';
import simone from '../../dummy-data/images/simone-hutsch-1678080-unsplash.jpg';
import ursula from '../../dummy-data/images/ursula-lauriston-1673373-unsplash.jpg';

class Gallery extends Component {

  photos = [cure, david, harley, karly, simone, ursula, cure, david, harley, karly, simone, ursula];

  render() {
    return(
      <div className='gallery-component'>
        {
          this.photos.map((photo, index) => {
            return(
              <Photo photoURL={photo} key={index}/>
            )
          })
        }
      </div>
    )
  }
}

export default Gallery;
