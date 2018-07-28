import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Card, CardContent } from '@material-ui/core';

import quizConfig from '../../../../config/quiz';

import styles from './CountDownTimerStyle';

/* eslint-disable react/prefer-stateless-function */
class CountDownTimer extends React.Component {
  constructor(props) {
    super(props);
    const { seconds = 0 } = props;
    this.state = { time: {}, seconds };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    const { seconds } = this.state;
    const timeLeftVar = this.secondsToTime(seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }

  secondsToTime = secs => {
    const days = Math.floor(secs / (60 * 60 * 24));

    const divisorForHours = Math.floor(secs % (60 * 60 * 24));
    const hours = Math.floor(divisorForHours / (60 * 60));

    const divisorForMinutes = secs % (60 * 60);
    const minutes = Math.floor(divisorForMinutes / 60);

    const divisorForSeconds = divisorForMinutes % 60;
    const seconds = Math.ceil(divisorForSeconds);

    const obj = {
      d: days,
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  };

  startTimer = () => {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  };

  countDown = () => {
    const { seconds } = this.state;

    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds - 1,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  };

  renderTimerTypeLabel = () => {
    const { timerType } = this.props;
    const { TIME_TO_START, TIME_TO_ANSWER, TIME_TO_FREEZE_ANSWER } = quizConfig.timerType;
    switch (timerType) {
      case TIME_TO_START:
        return 'Time To Start';
      case TIME_TO_ANSWER:
        return 'Time To Answer';
      case TIME_TO_FREEZE_ANSWER:
        return 'Time To Freeze Answer';
      default:
        return 'Time';
    }
  };

  render() {
    const { classes } = this.props;
    const { time } = this.state;

    return (
      <React.Fragment>
        <div className={classes.timerTypeContainer}>{this.renderTimerTypeLabel()}</div>
        <div className={classes.container}>
          {time.d ? (
            <Card>
              <CardContent className={classes.cardItem}>
                <div className={classes.timeItemContainer}>{time.d}</div>
                <div className={classes.timeItemLabel}>Day</div>
              </CardContent>
            </Card>
          ) : null}
          {time.h ? (
            <Card>
              <CardContent className={classes.cardItem}>
                <div className={classes.timeItemContainer}>{time.h}</div>
                <div className={classes.timeItemLabel}>Hour</div>
              </CardContent>
            </Card>
          ) : null}
          {time.m ? (
            <Card>
              <CardContent className={classes.cardItem}>
                <div className={classes.timeItemContainer}>{time.m}</div>
                <div className={classes.timeItemLabel}>Minute</div>
              </CardContent>
            </Card>
          ) : null}
          {time.s ? (
            <Card>
              <CardContent className={classes.cardItem}>
                <div className={classes.timeItemContainer}>{time.s}</div>
                <div className={classes.timeItemLabel}>Second</div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

CountDownTimer.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    timeItemLabel: PropTypes.string.isRequired,
    timeItemContainer: PropTypes.string.isRequired,
    cardItem: PropTypes.string.isRequired,
    timerTypeContainer: PropTypes.string.isRequired,
  }).isRequired,
  seconds: PropTypes.number.isRequired,
  timerType: PropTypes.number.isRequired,
};

export default withStyles(styles)(CountDownTimer);
