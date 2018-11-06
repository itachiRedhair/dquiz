import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Custom Components
import AddQuestionForm from '../AddQuestionForm';

import styles from './AddQuestionDialogStyle';

/* eslint-disable react/prefer-stateless-function */
class AddQuestionDialog extends React.Component {
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
        <DialogTitle id="form-dialog-title">Add Question</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter Question Details:</DialogContentText>
        </DialogContent>
        <AddQuestionForm handleClose={handleClose} />
      </Dialog>
    );
  }
}

AddQuestionDialog.propTypes = {
  classes: PropTypes.shape({ dialogue: PropTypes.string.isRequired }).isRequired,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(AddQuestionDialog);
