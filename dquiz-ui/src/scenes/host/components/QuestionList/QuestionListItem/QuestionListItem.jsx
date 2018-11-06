import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import styles from './QuestionList';

/* eslint-disable react/prefer-stateless-function */
class QuestionListItem extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.question}>Question</div>
        <div className={classes.answerContainer}>
          <div className={classes.answer}>Answer 1</div>
          <div className={classes.answer}>Answer 2</div>
          <div className={classes.answer}>Answer 3</div>
          <div className={classes.answer}>Answer 4</div>
        </div>
      </div>
    );
  }
}

QuestionListItem.propTypes = {
  classes: PropTypes.shape({ container: PropTypes.string.isRequired }).isRequired,
};

export default withStyles(styles)(QuestionListItem);
