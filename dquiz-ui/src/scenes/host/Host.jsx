import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';

import BackButton from '../../components/BackButton';
import styles from './HostStyle';

const Host = ({ classes }) => {
  return (
    <React.Fragment>
      <div className={classes.backButtonContainer}>
        <BackButton />
      </div>
      <div className={classes.createNewContainer}>
        <Button variant="contained" color="primary">
          Create New Quiz <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
    </React.Fragment>
  );
};

Host.propTypes = {
  classes: PropTypes.shape({
    backButtonContainer: PropTypes.string.isRequired,
    createNewContainer: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Host);
