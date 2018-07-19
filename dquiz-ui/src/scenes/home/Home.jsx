import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import styles from './HomeStyle';

const Home = ({ classes }) => (
  <div>
    <Grid container spacing={32}>
      <Grid item xs={6}>
        <div className={classes.iAmTextContainer}>I am</div>
      </Grid>
      <Grid item xs={6}>
        <div className={classes.buttonContainer}>
          <Link to="/host" className={classes.button}>
            <Button variant="contained">Host</Button>
          </Link>
          <Link to="/participant" className={classes.button}>
            <Button variant="contained">Participant</Button>
          </Link>
        </div>
      </Grid>
    </Grid>
  </div>
);

Home.propTypes = {
  classes: PropTypes.shape({
    iAmTextContainer: PropTypes.string.isRequired,
    buttonContainer: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Home);
