import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';

// Custom Components

import styles from './CreateQuizFormStyle';

class CreateQuizForm extends React.Component {
  componentDidMount() {}

  render() {
    const { classes, values, errors, touched, handleChange, handleBlur, handleSubmit /* isSubmitting */ } = this.props;
    return (
      <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="name"
          label="Name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          margin="normal"
        />
        {touched.name && errors.name && <div>{errors.name}</div>}
        <TextField
          id="description"
          label="Description"
          multiline
          rowsMax="2"
          className={classes.textField}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          margin="normal"
        />
        {touched.description && errors.description && <div>{errors.description}</div>}
        <TextField
          id="enterFees"
          label="Enter Fees"
          type="number"
          className={classes.textField}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.enterFees}
          margin="normal"
        />
        {touched.enterFees && errors.enterFees && <div>{errors.enterFees}</div>}
        <TextField
          id="startTime"
          label="Start Time"
          className={classes.textField}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.startTime}
          margin="normal"
        />
        {touched.startTime && errors.startTime && <div>{errors.startTime}</div>}
        <TextField
          id="timeToAnswer"
          label="Time To Answer"
          className={classes.textField}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.timeToAnswer}
          margin="normal"
        />
        {touched.timeToAnswer && errors.timeToAnswer && <div>{errors.timeToAnswer}</div>}
        <TextField
          id="timeToFreezeAnswer"
          label="Time To Freeze Answer"
          className={classes.textField}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.timeToFreezeAnswer}
          margin="normal"
        />
        {touched.timeToFreezeAnswer && errors.timeToFreezeAnswer && <div>{errors.timeToFreezeAnswer}</div>}
        <TextField
          id="totalQuestions"
          label="Total Questions"
          type="number"
          className={classes.textField}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.totalQuestions}
          margin="normal"
        />
        {touched.totalQuestions && errors.totalQuestions && <div>{errors.totalQuestions}</div>}
        <Button type="submit">Done</Button>
      </form>
    );
  }
}

CreateQuizForm.propTypes = {
  classes: PropTypes.shape({ form: PropTypes.string.isRequired }).isRequired,
  values: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  touched: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  //   isSubmitting: PropTypes.bool.isRequired,
};

export default withStyles(styles)(CreateQuizForm);
