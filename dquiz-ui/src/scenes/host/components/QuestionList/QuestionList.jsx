import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import styles from './QuestionList';

/* eslint-disable react/prefer-stateless-function */
class QuestionList extends React.Component {
  render() {
    const { classes } = this.props;

    return <div className={classes.container}>Question List</div>;
  }
}

QuestionList.propTypes = {
  classes: PropTypes.shape({ container: PropTypes.string.isRequired }).isRequired,
};

export default withStyles(styles)(QuestionList);
