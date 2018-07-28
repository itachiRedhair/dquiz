import { withFormik } from 'formik';

import CreateQuizForm from './CreateQuizForm';

const CreateQuizFormWithFormik = withFormik({
  mapPropsToValues: (/* props */) => ({
    name: '',
    description: '',
    enterFees: 0,
    startTime: '',
    timeToAnswer: '',
    timeToFreezeAnswer: '',
    totalQuestions: 0,
  }),

  validate: (values /* ,props */) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    } else if (values.name.length < 5) {
      errors.name = 'Quiz Name should be atleat greater than Four letters.';
    }
    return errors;
  },

  handleSubmit: (values, { props /* setSubmitting, setErrors */ }) => {
    const { handleClose } = props;
    handleClose();
  },
})(CreateQuizForm);

export default CreateQuizFormWithFormik;
