import React, {Component} from 'react';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import './photo.css';

const useStyles = theme => ({
  fab: {
    width: '40px',
    height: '40px',
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: '1%',
  }
});
class Photo extends Component {

  constructor(props) {
    super(props);
  }

  onDelete() {
    this.props.onDelete(this.props.id);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className='photo-wrapper'>
        <img src={this.props.photoURL} className='photo'/>
        <Fab
          aria-label="Delete"
          onClick={this.onDelete.bind(this)}
          className={classes.fab}
        >
          <DeleteIcon />
        </Fab>
      </div>
    )
  }
}

export default withStyles(useStyles())(Photo);

