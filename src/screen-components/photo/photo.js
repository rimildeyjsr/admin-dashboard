import React, {Component} from 'react';
import './photo.css';

class Photo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='photo-wrapper'>
        <img src={this.props.photoURL} className='photo'/>
      </div>
    )
  }
}

export default Photo;
