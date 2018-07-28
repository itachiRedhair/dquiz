import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Custom Components
import CreateQuizForm from '../CreateQuizForm';

import styles from './CreateQuizDialogStyle';

/* eslint-disable react/prefer-stateless-function */
class CreateQuizDialog extends React.Component {
  render() {
    const { classes, handleClose, isOpen } = this.props;

    return (
      <Dialog
        className={classes.dialogue}
        open={isOpen}
        onClose={handleClose}
        fullWidth
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Quiz</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter Quiz Details:</DialogContentText>
        </DialogContent>
        <CreateQuizForm handleClose={handleClose} />
      </Dialog>
    );
  }
}

CreateQuizDialog.propTypes = {
  classes: PropTypes.shape({ dialogue: PropTypes.string.isRequired }).isRequired,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(CreateQuizDialog);
