import { withFormik } from 'formik';

import AddQuestionForm from './AddQuestionForm';

const AddQuestionFormWithFormik = withFormik({
  mapPropsToValues: (/* props */) => ({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  }),

  validate: (values /* ,props */) => {
    const errors = {};
    if (!values.question) {
      errors.name = 'Required';
    } else if (values.name.length < 10) {
      errors.name = 'Question should be atleast greater than 10 letters?';
    }
    return errors;
  },

  handleSubmit: (values, { props /* setSubmitting, setErrors */ }) => {
    const { handleClose } = props;
    handleClose();
  },
})(AddQuestionForm);

export default AddQuestionFormWithFormik;
