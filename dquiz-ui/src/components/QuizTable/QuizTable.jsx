import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import styles from './QuizTableStyle';

const QuizTable = ({ classes }) => <div>quiz table</div>;

QuizTable.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(QuizTable);
