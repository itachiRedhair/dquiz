import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import AddQuestionDialog from '../AddQuestionDialog';
import RevealAnswerDialog from '../RevealAnswerDialog';

import styles from './HostQuizcontrolsStyle';

class HostQuizControls extends React.Component {
  constructor() {
    super();

    this.state = {
      isAddQuestionDialogOpen: false,
      isRevealAnswerDialogOpen: false,
    };
  }

  handleDialogClose = () => {
    this.setState(prevState => ({
      ...prevState,
      isRevealAnswerDialogOpen: false,
      isAddQuestionDialogOpen: false,
    }));
  };

  handleAddQuestion = () => {
    this.setState(prevState => ({
      ...prevState,
      isAddQuestionDialogOpen: true,
    }));
  };

  handleRevealAsnwer = () => {
    this.setState(prevState => ({
      ...prevState,
      isRevealAnswerDialogOpen: true,
    }));
  };

  render() {
    const { classes } = this.props;
    const { isAddQuestionDialogOpen, isRevealAnswerDialogOpen } = this.state;

    return (
      <div className={classes.container}>
        <Button className={classes.button} variant="contained" onClick={this.handleAddQuestion}>
          Add Question
        </Button>
        <Button className={classes.button} variant="contained" onClick={this.handleRevealAsnwer}>
          Reveal Answer
        </Button>
        <AddQuestionDialog isOpen={isAddQuestionDialogOpen} handleClose={this.handleDialogClose} />
        <RevealAnswerDialog isOpen={isRevealAnswerDialogOpen} handleClose={this.handleDialogClose} />
      </div>
    );
  }
}

HostQuizControls.propTypes = {
  classes: PropTypes.shape({ container: PropTypes.string.isRequired }).isRequired,
};

export default withStyles(styles)(HostQuizControls);
