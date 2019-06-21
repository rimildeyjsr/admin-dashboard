import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './circularProgress.css';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

export default function CircularDeterminate(props) {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    function tick() {
      setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + progress));
    }
    const timer = setInterval(tick , 10);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className='circular-progress-div'>
      <CircularProgress
        className={classes.progress}
        variant="determinate"
        value={props.progressPercent}
      />
    </div>
  );
}
