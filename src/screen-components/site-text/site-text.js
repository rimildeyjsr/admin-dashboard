import React, {Component} from 'react';
import './site-text.css';
import TextField from '@material-ui/core/TextField';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import upload from '../../images/upload.svg';
import firebaseConfig from "../../firebase-config";

const firebase = require("firebase");
require("firebase/firestore");

const useStyles = theme => ({
  textField: {
    width: '95%',
  },
});

const theme = createMuiTheme({
  palette: {
    primary: purple,
  },
});


class SiteText extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.loadData();
  }

  loadData() {
    let self = this;
    let db = firebase.firestore();
    let query = db.collection('staticText');
    query.onSnapshot(function (querySnapshot) {
      querySnapshot.docChanges().forEach(function (change) {
        let dataRef = change.doc;
        let dataRefID = dataRef.id;
        self.setState({[dataRefID]:dataRef.data().text});
      });
    });
  }

  handleInputFieldChange(event,id) {
    this.setState({[id]: event.target.value});
  }

  publishTextChanges(event) {
    event.preventDefault();
    let db = firebase.firestore();
    let self = this;
    Object.keys(this.state).forEach(function(key) {
      let dbRef = db.collection("staticText").doc(key);
      dbRef.set({
        text: self.state[key],
      }).then( () => {
        console.log("Data stored in Firestore!");
      });
    });
  }

  render() {
    const { classes } = this.props;
    return(
      <div className='site-text-wrapper'>
        <div className='site-text-container'>
          <section className='section-wrapper'>
            <h2 className='section-header'>FROM THE ADMINISTRATION'S DESK</h2>
            <ThemeProvider theme={theme}>
              <TextField
                id="principalMsg"
                label="Principal's Message"
                multiline
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.principalMsg}
                onChange={(e) => {this.handleInputFieldChange(e,'principalMsg')}}
              />
            </ThemeProvider>

            <ThemeProvider theme={theme}>
              <TextField
                id="vicePrincipalMsg"
                label="Vice Principal's Message"
                multiline
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.vicePrincipalMsg}
                onChange={(e) => {this.handleInputFieldChange(e,'vicePrincipalMsg')}}
              />
            </ThemeProvider>
          </section>

          <section className='section-wrapper'>
            <ThemeProvider theme={theme}>
              <h2 className='section-header'>WORDS FROM OUR FOUNDER</h2>
              <TextField
                id="founderMsg"
                label="Founder's Message"
                multiline
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={this.state.founderMsg}
                onChange={(e) => {this.handleInputFieldChange(e,'founderMsg')}}
              />
            </ThemeProvider>
          </section>

          <button className='upload-button' onClick={this.publishTextChanges.bind(this)}>
            <img src={upload} className='upload-button-image'/>
            PUBLISH NOW
          </button>
        </div>
      </div>
    )
  }
}

export default withStyles(useStyles())(SiteText);
