import React, {Component} from 'react';
import './gallery.css';
import Photo from '../photo/photo';
import PreviewLightbox from "../preview-lightbox/previewLightbox";

const firebase = require("firebase");
require("firebase/firestore");

class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      showPreviewPopup: false,
      tempImageURL: null,
      fileID: null
    };
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
    let self = this;
    let db = firebase.firestore();
    let query = db.collection('gallery')
      .orderBy('timestamp', 'desc');
    query.onSnapshot(function(querySnapshot) {
      querySnapshot.docChanges().forEach(function(change) {
        let dataRef = change.doc;
        let source = dataRef.metadata.hasPendingWrites ? 'Local' : 'Server';
        let reqURL = dataRef.data().downloadURL;
        if (source === 'Server') {
          if (change.type === 'removed') {
            self.setState((prevState) => ({
              photos: prevState.photos.filter((photo) => {
                return photo.downloadURL !== reqURL;
              })
            }));
          } else {
            self.setState((prevState) => ({
              photos : [...prevState.photos, dataRef]
            }));
          }
        }
        });
    });
  }

  getImage(event) {
    event.preventDefault();
    this.saveImageMessage(this.state.fileID);
  }

  saveImageMessage(file) {
    firebase.storage().ref('images/' + file.name).put(file).then((snapshot) => {
      return snapshot.ref.getDownloadURL().then((url) => {
        let db = firebase.firestore();
        let dbRef = db.collection("gallery").doc(file.name);
        dbRef.set({
          downloadURL: url,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then( () => {
          console.log("Data stored in Firestore!", url);
          this.setState({
            showPreviewPopup : !this.state.showPreviewPopup
          })
        });
      });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  onDelete(id) {
    this.setState((prevState) => ({
      photos: prevState.photos.filter((photo) => {
        return photo.id !== id;
      })
    }));
    firebase.storage().ref('images/' + id).delete().then(function() {
      let db = firebase.firestore();
      let dbRef = db.collection("gallery").doc(id);
      dbRef.delete().then(function() {
        console.log("Data deleted in Firestore!",id);
      }).catch(function (error) {
        console.log(error);
      })
    }).catch(function(error) {
      console.error("error deleting document", error);
    });
  }

  showPreview(event) {
    event.preventDefault();
    let file = event.target.files[0];
    this.setState({
      tempImageURL: URL.createObjectURL(file),
      showPreviewPopup: !this.state.showPreviewPopup,
      fileID: file
    });
  }

  toggleLightBoxDisplay() {
    this.setState( {
      showPreviewPopup: !this.state.showPreviewPopup
    });
  }

  render() {
    return !!this.state.photos ?
      (
        <div className='gallery-upload-button-wrapper'>
          <div className='gallery-component'>
            {
              this.state.photos.map((photo, index) => {
                return(
                  <Photo
                    photoURL={photo.data().downloadURL}
                    id={photo.id}
                    key={index}
                    onDelete={this.onDelete.bind(this)}
                  />
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
            onChange={this.showPreview.bind(this)}
          />
          <label htmlFor="mediaCapture">UPLOAD PHOTOS</label>
          {
            this.state.showPreviewPopup ?
            <PreviewLightbox
              imageURL={this.state.tempImageURL}
              closeLightBox={this.toggleLightBoxDisplay.bind(this)}
              updateImage={this.getImage.bind(this)}
            />
            :
            null
          }
        </div>
      )
    :
    null
  }
}

export default Gallery;
