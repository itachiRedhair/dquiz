import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';
import {
  faQuestionCircle,
  faClock,
  faUser,
  faDollarSign,
  faInfoCircle,
  faUserClock,
} from '@fortawesome/free-solid-svg-icons';

import styles from './QuizListStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class QuizTable extends Component {
  constructor() {
    super();
    this.state = {
      expanded: null,
    };
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <Card>
        <CardHeader title="Created Quizzes" />
        <CardContent>
          <div>
            <div className={classes.panelContainer}>
              <ExpansionPanel
                expanded={expanded === 'panel1'}
                onChange={this.handleChange('panel1')}
                className={classes.panel}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <div className={classes.quizSummary}>
                    <span>
                      <FontAwesomeIcon icon={faQuestionCircle} /> Quiz Name
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faClock} /> 07/08 02:25 AM
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faDollarSign} /> 20 wei
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faUser} /> 10
                    </span>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div>
                    <div>
                      <FontAwesomeIcon icon={faInfoCircle} /> Description: Lorem ipsum description
                      of quiz what it is about all those things
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faClock} /> Start Time: 07/08 02:25 AM
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faUserClock} /> Question Duration: 60 Seconds
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faDollarSign} /> Entering Fees: 20 wei
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faUser} /> Total Participants: 10
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faDollarSign} /> Total Reward: 20 wei
                    </div>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <Button variant="contained" className={classes.enterButton}>
                Enter
              </Button>
            </div>
            <div className={classes.panelContainer}>
              <ExpansionPanel
                expanded={expanded === 'panel2'}
                onChange={this.handleChange('panel2')}
                className={classes.panel}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <div className={classes.quizSummary}>
                    <span>
                      <FontAwesomeIcon icon={faQuestionCircle} /> Quiz Name
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faClock} /> 07/08 02:25 AM
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faDollarSign} /> 20 wei
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faUser} /> 10
                    </span>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div>
                    <div>
                      <FontAwesomeIcon icon={faInfoCircle} /> Description: Lorem ipsum description
                      of quiz what it is about all those things
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faClock} /> Start Time: 07/08 02:25 AM
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faUserClock} /> Question Duration: 60 Seconds
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faDollarSign} /> Entering Fees: 20 wei
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faUser} /> Total Participants: 10
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faDollarSign} /> Total Reward: 20 wei
                    </div>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <Button variant="contained" className={classes.enterButton}>
                Enter
              </Button>
            </div>
            <div className={classes.panelContainer}>
              <ExpansionPanel
                expanded={expanded === 'panel3'}
                onChange={this.handleChange('panel3')}
                className={classes.panel}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <div className={classes.quizSummary}>
                    <span>
                      <FontAwesomeIcon icon={faQuestionCircle} /> Quiz Name
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faClock} /> 07/08 02:25 AM
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faDollarSign} /> 20 wei
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faUser} /> 10
                    </span>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div>
                    <div>
                      <FontAwesomeIcon icon={faInfoCircle} /> Description: Lorem ipsum description
                      of quiz what it is about all those things
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faClock} /> Start Time: 07/08 02:25 AM
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faUserClock} /> Question Duration: 60 Seconds
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faDollarSign} /> Entering Fees: 20 wei
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faUser} /> Total Participants: 10
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faDollarSign} /> Total Reward: 20 wei
                    </div>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <Button variant="contained" className={classes.enterButton}>
                Enter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

QuizTable.propTypes = {
  classes: PropTypes.shape({
    quizSummary: PropTypes.string.isRequired,
    panel: PropTypes.string.isRequired,
    panelContainer: PropTypes.string.isRequired,
    enterButton: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(QuizTable);
