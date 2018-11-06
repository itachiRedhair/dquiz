import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';
import quizConstants from '../../../../config/quiz';

// Custom Components
import BackButton from '../../../../components/BackButton';
import QuizList from '../../../../components/QuizList';
import styles from './HostHomeStyle';
import CreateQuizDialog from '../../components/CreateQuizDialog';

class HostHome extends Component {
  constructor() {
    super();
    this.state = {
      isDialogOpen: false,
    };
  }

  handleDialogOpen = () => {
    this.setState({ isDialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ isDialogOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { isDialogOpen } = this.state;

    return (
      <React.Fragment>
        <div>
          <div className={classes.backButtonContainer}>
            <BackButton backRoute="/" />
          </div>
          <div className={classes.createNewContainer}>
            <Button variant="contained" color="primary" onClick={this.handleDialogOpen}>
              Create New Quiz <FontAwesomeIcon icon={faPlus} />
            </Button>
          </div>
        </div>
        <div className={classes.createdQuizList}>
          <QuizList buttonText="Start" quizTitle="Created Quizzes" quizType={quizConstants.quizType.CREATED_QUIZZES} />
        </div>
        <CreateQuizDialog isOpen={isDialogOpen} handleClose={this.handleDialogClose} />
      </React.Fragment>
    );
  }
}

HostHome.propTypes = {
  classes: PropTypes.shape({
    backButtonContainer: PropTypes.string.isRequired,
    createNewContainer: PropTypes.string.isRequired,
    createdQuizList: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(HostHome);
