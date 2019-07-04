import React, {Component} from 'react';
import './loginPage.css';
import GoogleButton from 'react-google-button';
import firebaseConfig from '../../firebase-config';
import Gallery from "../gallery/gallery";
import LoginError from "../login-error/loginError";

const firebase = require("firebase");
require("firebase/auth");
require("firebase/firestore");

class LoginPage extends Component {

  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.state = {
      showErrorDialog: false,
      showAdminDashboard: false,
    }
  }

  handleLoginClick() {
    let provider = new firebase.auth.GoogleAuthProvider();
    let self = this;
    firebase.auth().signInWithPopup(provider).then(function(result) {
      self.checkifUserHasAccess(result.user.email);
    }).catch(function(error) {
      console.error(error);
    });
  }

  checkifUserHasAccess(userEmail) {
    let hasAccess = false;
    let self = this;
    let db = firebase.firestore();
    let query = db.collection('authorizedUsers');
    query.get().then(function (querySnapshot) {
      querySnapshot.docChanges().forEach(function (change) {
        let dataRef = change.doc.data().email;
        if (userEmail === dataRef) {
          hasAccess = true;
        }
      });
      if (hasAccess) {
        self.setState({
          showAdminDashboard: true
        });
      } else {
        self.setState({
          showErrorDialog: true
        });
      }
    });
  }

  toggleDisplay() {
    this.setState({
      showErrorDialog: !this.state.showErrorDialog
    });
  }

  render() {
    return (
      <div className='component-wrapper'>
        {
          !this.state.showAdminDashboard && !this.state.showErrorDialog ?
            <div className='login-component-wrapper'>
              <h1 className='admin-portal-title'>Admin Portal</h1>
              <GoogleButton
                onClick={this.handleLoginClick.bind(this)}
              />
            </div>
          :
          null
        }

        {
          this.state.showAdminDashboard ?
          <Gallery/>
          :
          null
        }

        {
          this.state.showErrorDialog ?
            <LoginError
              closeLightBox={this.toggleDisplay.bind(this)}
            />
            :
            null
        }
      </div>
    )
  }
}

export default LoginPage;
