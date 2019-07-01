import React, {Component} from 'react';
import './gallery.css';
import Photo from '../photo/photo';
import PreviewLightbox from "../preview-lightbox/previewLightbox";
import CircularIndeterminate from "../circular-progress/circularProgress";
import DetailPictureViewLightbox from "../detail-picture-view-lightbox/detailPictureViewLightbox";

const firebase = require("firebase");
require("firebase/firestore");

class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      showPreviewPopup: false,
      showExpandedImagePopup: false,
      tempImageURL: null,
      fileID: null,
      showUploadProgress: false,
      showDeleteProgress: false,
    };

    const firebaseConfig = {
      apiKey: "AIzaSyCZySZxPITGy8CzxywIxXGIh7MP8GL5E8c",
      authDomain: "admin-dashboard-ceacb.firebaseapp.com",
      databaseURL: "https://admin-dashboard-ceacb.firebaseio.com",
      projectId: "admin-dashboard-ceacb",
      storageBucket: "admin-dashboard-ceacb.appspot.com",
      messagingSenderId: "34050641425",
      appId: "1:34050641425:web:38b650461527084e",
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
      .orderBy('timestamp', 'asc');
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
              photos : [dataRef, ...prevState.photos],
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

  deleteImageFromExpandedPreview(event) {
    event.preventDefault();
    this.onDelete(this.state.fileID);
  }

  saveImageMessage(file) {
    this.setState({
      showUploadProgress: true
    });
    let uploadTask = firebase.storage().ref('images/' + file.name).put(file);
    uploadTask.then((snapshot) => {
      return snapshot.ref.getDownloadURL().then((url) => {
        let db = firebase.firestore();
        let dbRef = db.collection("gallery").doc(file.name);
        dbRef.set({
          downloadURL: url,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then( () => {
          console.log("Data stored in Firestore!", url);
          this.setState({
            showPreviewPopup : !this.state.showPreviewPopup,
            showUploadProgress: false,
          })
        });
      });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  onDelete(id) {
    console.log(id);
    let self = this;
    this.setState({
      showDeleteProgress: true
    });
    firebase.storage().ref('images/' + id).delete().then(function() {
      let db = firebase.firestore();
      let dbRef = db.collection("gallery").doc(id);
      dbRef.delete().then(function() {
        console.log("Data deleted in Firestore!",id);
        self.setState((prevState) => ({
          showDeleteProgress: false,
          showExpandedImagePopup: false,
          photos: prevState.photos.filter((photo) => {
            return photo.id !== id;
          })
        }));
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
      fileID: file,
    });
  }

  toggleLightBoxDisplay() {
    this.setState( {
      showPreviewPopup: !this.state.showPreviewPopup,
      tempImageURL: null,
      fileID: null,
    });
  }

  showExpandedImagePreview(id, downloadURL) {
    this.setState({
      showExpandedImagePopup: !this.state.showExpandedImagePopup,
      fileID: id,
      tempImageURL: downloadURL,
    });
  }

  toggleExpandedImagePreviewDisplay() {
    this.setState({
      showExpandedImagePopup: !this.state.showExpandedImagePopup,
      fileID: null,
      tempImageURL: null,
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
                    onClick={this.showExpandedImagePreview.bind(this)}
                  />
                )
              })
            }
          </div>

          <CircularIndeterminate showDeleteProgress={this.state.showDeleteProgress}/>

          <input
            name="mediaCapture"
            id="mediaCapture"
            type="file"
            accept="image/*"
            capture="camera"
            className='upload-input'
            onChange={this.showPreview.bind(this)}
          />
          <label htmlFor="mediaCapture">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="add-photo-img"
            >
              <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z" className="add-photo-img-svg"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
            UPLOAD PHOTOS
          </label>

          {
            this.state.showPreviewPopup ?
            <PreviewLightbox
              imageURL={this.state.tempImageURL}
              closeLightBox={this.toggleLightBoxDisplay.bind(this)}
              updateImage={this.getImage.bind(this)}
              showUploadProgress={this.state.showUploadProgress}
            />
            :
            null
          }

          {
            this.state.showExpandedImagePopup ?
              <DetailPictureViewLightbox
                imageURL={this.state.tempImageURL}
                closeLightBox={this.toggleExpandedImagePreviewDisplay.bind(this)}
                showDeleteProgress={this.state.showDeleteProgress}
                deleteImage={this.deleteImageFromExpandedPreview.bind(this)}
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
