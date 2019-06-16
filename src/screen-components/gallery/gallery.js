import React, {Component} from 'react';
import './gallery.css';
import Photo from '../photo/photo';

const firebase = require("firebase");
require("firebase/firestore");

class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = {photos: []};
    const firebaseConfig = {
      apiKey: "AIzaSyCZySZxPITGy8CzxywIxXGIh7MP8GL5E8c",
      authDomain: "admin-dashboard-ceacb.firebaseapp.com",
      databaseURL: "https://admin-dashboard-ceacb.firebaseio.com",
      projectId: "admin-dashboard-ceacb",
      storageBucket: "admin-dashboard-ceacb.appspot.com",
      messagingSenderId: "34050641425",
      appId: "1:34050641425:web:38b650461527084e"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.loadData();
  }

  loadData() {
    let db = firebase.firestore();
    let self = this;
    db.collection("gallery").onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        let reqURL = change.doc.data().downloadURL;
        if (change.type === 'removed') {
          self.setState((prevState) => ({
            photos: prevState.photos.filter((url) =>{
              return url !== reqURL;
            })
          }))
        } else {
        self.setState((prevState) => ({
          photos : [...prevState.photos, reqURL]
        }));
      }});
    });
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
    return !!this.state.photos ? (
      <div className='gallery-upload-button-wrapper'>
        <div className='gallery-component'>
          {
            this.state.photos.map((photo, index) => {
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
    :
    null
  }
}

export default Gallery;
