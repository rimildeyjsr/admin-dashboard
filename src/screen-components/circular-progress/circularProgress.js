import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './circularProgress.css';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

export default function CircularIndeterminate(props) {
  const classes = useStyles();
  return (
    <div className='circular-progress-div'>
      {props.showProgress ?
        <CircularProgress
          className={classes.progress}
        />
        :
        null
      }
    </div>
  );
}
