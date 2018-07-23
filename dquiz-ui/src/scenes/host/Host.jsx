import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';

// Custom Components
import BackButton from '../../components/BackButton';
import QuizList from '../../components/QuizList';
import styles from './HostStyle';

const Host = ({ classes }) => {
  return (
    <React.Fragment>
      <div>
        <div className={classes.backButtonContainer}>
          <BackButton />
        </div>
        <div className={classes.createNewContainer}>
          <Button variant="contained" color="primary">
            Create New Quiz <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </div>
      <div className={classes.createdQuizList}>
        <QuizList />
      </div>
    </React.Fragment>
  );
};

Host.propTypes = {
  classes: PropTypes.shape({
    backButtonContainer: PropTypes.string.isRequired,
    createNewContainer: PropTypes.string.isRequired,
    createdQuizList: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Host);
