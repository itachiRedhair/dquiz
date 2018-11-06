import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

import styles from './RevealAnswerDialogStyle';
import { DialogContentText } from '../../../../../node_modules/@material-ui/core';

/* eslint-disable react/prefer-stateless-function */
class RevealAnswerDialog extends React.Component {
  state = {
    selectedIndex: 0,
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes, handleClose, isOpen } = this.props;
    const { selectedIndex } = this.state;

    return (
      <Dialog
        className={classes.dialogue}
        open={isOpen}
        onClose={handleClose}
        fullWidth
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Reveal Answer</DialogTitle>
        <DialogContent>
          <DialogContentText> Select option to reveal:</DialogContentText>
          <div>
            <List component="nav">
              <MenuItem button selected={selectedIndex === 0} onClick={event => this.handleListItemClick(event, 0)}>
                <ListItemText primary="Option 1" />
              </MenuItem>
              <MenuItem button selected={selectedIndex === 1} onClick={event => this.handleListItemClick(event, 1)}>
                <ListItemText primary="Option 2" />
              </MenuItem>
              <MenuItem button selected={selectedIndex === 2} onClick={event => this.handleListItemClick(event, 2)}>
                <ListItemText primary="Option 3" />
              </MenuItem>
              <MenuItem button selected={selectedIndex === 3} onClick={event => this.handleListItemClick(event, 3)}>
                <ListItemText primary="Option 4" />
              </MenuItem>
            </List>
            <div className={classes.buttonContainer}>
              <Button variant="contained">Reveal</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

RevealAnswerDialog.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(RevealAnswerDialog);
