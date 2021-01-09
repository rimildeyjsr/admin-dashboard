import React, {Component} from 'react';
import './loginPage.css';
import firebaseConfig from '../../firebase-config';
import LoginError from "../login-error/loginError";
import MainDashboard from "../main-dashboard/main-dashboard";
import schoolLogo from "../../images/school-logo.svg";
import googleButton from "../../images/ggogbtn.svg";
import CircularIndeterminate from "../circular-progress/circularProgress";

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
      showLoginProgress: false,
    }
  }

  handleLoginClick() {
    let provider = new firebase.auth.GoogleAuthProvider();
    let self = this;
    this.setState({
      showLoginProgress: true,
    });
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // self.checkifUserHasAccess(result.user.email);
      self.setState({
        showAdminDashboard: true,
        showLoginProgress: false,
      });
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
          showAdminDashboard: true,
          showLoginProgress: false,
        });
      } else {
        self.setState({
          showErrorDialog: true,
          showLoginProgress: false,
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
              <img src={schoolLogo} className='school-logo-img'/>
              {
                !this.state.showLoginProgress ?
                <img
                  src={googleButton}
                  className='sign-in-button'
                  onClick={this.handleLoginClick.bind(this)}
                />
                :
                <CircularIndeterminate showLoginProgress={this.state.showLoginProgress}/>
              }
            </div>
          :
          null
        }

        {
          this.state.showAdminDashboard ?
          <MainDashboard/>
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
