import React, {Component} from 'react';
import './loginError.css';
import exclamationImage from '../../images/exclamation.png';
import crossButton from "../../images/cross-button.png";

class LoginError extends Component {
  render() {
    return (
      <div className='error-dialog-wrapper'>
        <div className='error-dialog-inner'>
          <img
            onClick={this.props.closeLightBox}
            src={crossButton}
            alt='Cross button image'
            className='cross-button'
          />
          <img src={exclamationImage}  alt='exclamation image' className='exclamation-image'/>
          <h1 className='not-authorized-title'>
            You are not authorized to access this page
          </h1>
        </div>
      </div>
    )
  }
}

export default LoginError;
