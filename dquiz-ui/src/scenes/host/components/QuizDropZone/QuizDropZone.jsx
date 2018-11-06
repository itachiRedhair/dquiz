import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import DropZone from 'react-dropzone-csv-to-json';

import styles from './QuizDropZoneStyle';

/* eslint-disable react/prefer-stateless-function */
class QuizDropZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  getJson = quizData => {
    console.log(quizData);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <DropZone className={classes.dropZone} getJson={this.getJson}>
          Upload your question csv file here in the right format
        </DropZone>
      </div>
    );
  }
}

QuizDropZone.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(QuizDropZone);
