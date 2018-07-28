import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';

import styles from './BackButtonStyle';

const BackButton = ({ classes, backRoute }) => (
  <Link to={backRoute}>
    <Button variant="fab" className={classes.backButton}>
      <FontAwesomeIcon icon={faLongArrowAltLeft} />
    </Button>
  </Link>
);

BackButton.propTypes = {
  classes: PropTypes.shape({
    backButton: PropTypes.string.isRequired,
  }).isRequired,
  backRoute: PropTypes.string.isRequired,
};

export default withStyles(styles)(BackButton);
