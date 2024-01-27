
import React, { useState, useEffect } from 'react';
import "../../node_modules/bootstrap/scss/bootstrap.scss";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../assets/css/form.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addField, removeField } from '../store/slices/form.slice.jsx';

const FormComponent = ({ formData, onDelete }) => {
  const outputJson = useSelector((state) => {
    return state.field;
  });

  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    id: formData.id,
    ruleType: '',
    value: '',
    score: '',
    operator: '>=',
    combinator: formData.combinator,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Update formValues when formData is present
    if (formData && formData.ruleType) {
      setFormValues({
        ...formValues,
        ruleType: formData.ruleType,
      });
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the form has already been submitted
    if (formSubmitted) {
      toast.error('Form already submitted!');
      return;
    }

    // Check if the required fields are filled
    if (!formValues.value || !formValues.operator) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (formData.combinator === null) {
      toast.error('Combinator not selected');
      return;
    }

    const existingFieldIndex = outputJson.rules.findIndex(
      (data) => data.id === formValues.id
    );

    if (existingFieldIndex !== -1) {
      toast.error('Already submitted!');
      return;
    }

    const data = formValues;
    dispatch(addField(data));

    // Disable the form fields after submission
    setFormSubmitted(true);
  };

  function handleDelete(id) {
    dispatch(removeField(id));
    onDelete(id);
  }

  if (!formData) {
    return null;
  }

  return (
    <>
      <ToastContainer />
      <Form
        className={styles.form}
        key={formData.ruleType}
        onSubmit={(e) => handleSubmit(e, formData.ruleType)}
      >
        <Form.Group>
          <Form.Label>Rule Type</Form.Label>
          <Form.Control
            className={styles.input}
            type="text"
            placeholder="Enter rule type"
            value={formData.ruleType}
            readOnly
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Operator</Form.Label>
          <Form.Select
            value={formValues.operator || '>='}
            onChange={(e) => handleInputChange(e, formData.ruleType)}
            id="operator"
            required
            disabled={formSubmitted} 
          >
            <option className={styles.input} value=">=">{'>='}</option>
            <option className={styles.input} value=">">{'>'}</option>
            <option className={styles.input} value="<">{'<'}</option>
            <option className={styles.input} value="<=">{'<='}</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Operator is required.
          </Form.Control.Feedback>
        </Form.Group>

        <div className={styles.wrapper}>
                    <Form.Group className={styles.value}>
                        <Form.Label>Value</Form.Label>
                        <Form.Control

                            type="number"
                            placeholder="Enter value"
                            value={formValues.value || ''}
                            onChange={(e) => handleInputChange(e, formData.ruleType)}
                            id="value"
                            required
                            disabled={formSubmitted} 
                        />
                        <Form.Control.Feedback type="invalid">Value is required.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className={styles.score}>
                        <Form.Label>Score</Form.Label>
                        <Form.Control

                            type="number"
                            placeholder="Enter..."
                            value={formValues.score || ''}
                            onChange={(e) => handleInputChange(e, formData.ruleType)}
                            id="score"
                            required
                            disabled={formSubmitted} 
                        />
                        <Form.Control.Feedback type="invalid">Value is required.</Form.Control.Feedback>
                    </Form.Group>
                </div>

        <div className={styles.btnContainer}>
          <Button variant="primary" type="submit" disabled={formSubmitted}>
            Submit
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(formData.id)}
          >
            Delete
          </Button>
        </div>
      </Form>
    </>
  );
};

export default FormComponent;
