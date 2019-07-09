import React, {Component} from 'react';
import './site-text.css';
import TextField from '@material-ui/core/TextField';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import upload from '../../images/upload.svg';

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
                id="outlined-textarea"
                label="Principal's Message"
                multiline
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </ThemeProvider>

            <ThemeProvider theme={theme}>
              <TextField
                id="outlined-textarea"
                label="Vice Principal's Message"
                multiline
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </ThemeProvider>
          </section>

          <section className='section-wrapper'>
            <ThemeProvider theme={theme}>
              <h2 className='section-header'>WORDS FROM OUR FOUNDER</h2>
              <TextField
                id="outlined-textarea"
                label="Founder's Message"
                multiline
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </ThemeProvider>
          </section>

          <button className='upload-button'>
            <img src={upload} className='upload-button-image'/>
            PUBLISH NOW
          </button>
        </div>
      </div>
    )
  }
}

export default withStyles(useStyles())(SiteText);
