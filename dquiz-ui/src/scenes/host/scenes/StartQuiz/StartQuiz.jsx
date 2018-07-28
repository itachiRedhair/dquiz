import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent } from '@material-ui/core';

// Custom Components
import QuizDropZone from '../../components/QuizDropZone';
import BackButton from '../../../../components/BackButton';

import styles from './StartQuizStyle';
import CountDownTimer from '../../components/CountDownTimer';
import HostQuizControls from '../../components/HostQuizControls';

/* eslint-disable react/prefer-stateless-function */
class StartQuiz extends Component {
  //   static getDerivedStateFromProps(nextProps, prevState) {
  //     console.log(nextProps);
  //     return null;
  //   }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.backButtonContainer}>
          <BackButton backRoute="/host" />
        </div>

        <div className={classes.contentContainer}>
          <Grid container spacing={32}>
            <Grid item xs={8}>
              <Card className={classes.card}>
                <CardContent>
                  <div>Quiz Name: Sample Quiz Name</div>
                  <div>Quiz Description: Sample Quiz Description</div>
                  <div>
                    <QuizDropZone />
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.countDownTimer}>
                <CountDownTimer seconds={10000} />
              </div>
              <div className={classes.controllerContainer}>
                <HostQuizControls />
              </div>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

StartQuiz.propTypes = {
  classes: PropTypes.shape({
    backButtonContainer: PropTypes.string.isRequired,
    contentContainer: PropTypes.string.isRequired,
    quizDropZone: PropTypes.string.isRequired,
    countDownTimer: PropTypes.string.isRequired,
    controllerContainer: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(StartQuiz);
