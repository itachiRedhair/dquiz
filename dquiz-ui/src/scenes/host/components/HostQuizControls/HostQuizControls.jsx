import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import styles from './HostQuizcontrolsStyle';

/* eslint-disable react/prefer-stateless-function */
class HostQuizControls extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Button className={classes.button} variant="contained">
          Add Question
        </Button>
        <Button className={classes.button} variant="contained">
          Reveal Answer
        </Button>
      </div>
    );
  }
}

HostQuizControls.propTypes = {
  classes: PropTypes.shape({ container: PropTypes.string.isRequired }).isRequired,
};

export default withStyles(styles)(HostQuizControls);
