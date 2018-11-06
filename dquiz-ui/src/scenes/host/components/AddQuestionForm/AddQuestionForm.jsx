import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core';

// Custom Components

import styles from './AddQuestionFormStyle';

class CreateQuizForm extends React.Component {
  componentDidMount() {}

  render() {
    const { classes, values, errors, touched, handleChange, handleBlur, handleSubmit /* isSubmitting */ } = this.props;
    return (
      <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="question"
          label="Question"
          className={classes.textField}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.question}
          margin="normal"
        />
        {touched.question && errors.question && <div>{errors.question}</div>}
        <TextField
          id="option1"
          label="Option 1"
          multiline
          rowsMax="2"
          className={classes.textField}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.option1}
          margin="normal"
        />
        {touched.option1 && errors.option1 && <div>{errors.option1}</div>}
        <TextField
          id="option2"
          label="Option 2"
          multiline
          rowsMax="2"
          className={classes.textField}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.option2}
          margin="normal"
        />
        {touched.option2 && errors.option2 && <div>{errors.option2}</div>}
        <TextField
          id="option3"
          label="Option 3"
          multiline
          rowsMax="2"
          className={classes.textField}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.option3}
          margin="normal"
        />
        {touched.option3 && errors.option3 && <div>{errors.option3}</div>}
        <TextField
          id="option4"
          label="Option 4"
          multiline
          rowsMax="2"
          className={classes.textField}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.option4}
          margin="normal"
        />
        {touched.option4 && errors.option4 && <div>{errors.option4}</div>}
        <Button type="submit">Add</Button>
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
