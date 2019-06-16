import React, {Component} from 'react';
import './gallery.css';
import Photo from '../photo/photo';
import cure from '../../dummy-data/images/curology-1540938-unsplash.jpg';
import david from '../../dummy-data/images/david-lundgren-1677087-unsplash.jpg';
import harley from '../../dummy-data/images/harley-davidson-1628439-unsplash.jpg';
import karly from '../../dummy-data/images/karly-gomez-1561494-unsplash.jpg';
import simone from '../../dummy-data/images/simone-hutsch-1678080-unsplash.jpg';
import ursula from '../../dummy-data/images/ursula-lauriston-1673373-unsplash.jpg';

const firebase = require("firebase");
require("firebase/firestore");

class Gallery extends Component {

  photos = [cure, david, harley, karly, simone, ursula, cure, david, harley, karly, simone, ursula];

  constructor(props) {
    super(props);
    const firebaseConfig = {
      apiKey: "AIzaSyCZySZxPITGy8CzxywIxXGIh7MP8GL5E8c",
      authDomain: "admin-dashboard-ceacb.firebaseapp.com",
      databaseURL: "https://admin-dashboard-ceacb.firebaseio.com",
      projectId: "admin-dashboard-ceacb",
      storageBucket: "admin-dashboard-ceacb.appspot.com",
      messagingSenderId: "34050641425",
      appId: "1:34050641425:web:38b650461527084e"
    };
    firebase.initializeApp(firebaseConfig);
  }

  getImage(event) {
    event.preventDefault();
    let file = event.target.files[0];
    this.saveImageMessage(file);
  }

  getUserName() {
    return firebase.auth().currentUser.displayName;
  }

  saveImageMessage(file) {
    firebase.storage().ref('images/' + file.name).put(file).then((snapshot) => {
      return snapshot.ref.getDownloadURL().then((url) => {
        let db = firebase.firestore();
        let dbRef = db.collection("gallery").doc(file.name);
        dbRef.set({
          downloadURL: url
        }).then( () => {
          console.log("Data stored in Firestore!", url);
        });
      });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

  }

  render() {
    return(
      <div className='gallery-upload-button-wrapper'>
        <div className='gallery-component'>
          {
            this.photos.map((photo, index) => {
              return(
                <Photo photoURL={photo} key={index} />
              )
            })
          }
        </div>
        <input
          name="mediaCapture"
          id="mediaCapture"
          type="file"
          accept="image/*"
          capture="camera"
          className='upload-input'
          onChange={this.getImage.bind(this)}
        />
        <label htmlFor="mediaCapture">Upload Image</label>
      </div>
    )
  }
}

export default Gallery;
