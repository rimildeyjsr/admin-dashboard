import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './circularProgress.css';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
  whiteProgress: {
    margin: theme.spacing(2),
    color: 'white',
  }
}));

export default function CircularIndeterminate(props) {
  const classes = useStyles();
  return (
    <div className='circular-progress-div'>
      {
        props.showUploadProgress ?
        <CircularProgress
          className={classes.progress}
          color='primary'
        />
        :
        null
      }
      {
        props.showDeleteProgress ?
          <CircularProgress
            className={classes.progress}
            color='secondary'
          />
          :
          null
      }
      {
        props.showLoginProgress ?
          <CircularProgress
            className={classes.whiteProgress}
            color='inherit'
          />
          :
          null
      }
    </div>
  );
}
