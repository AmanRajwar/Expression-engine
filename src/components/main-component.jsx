import React, { useEffect, useState } from 'react';
import "../../node_modules/bootstrap/scss/bootstrap.scss";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import FormComponent from './form-component.jsx';
import Output from './output-component.jsx';
import styles from '../assets/css/main.module.css'
import { Form, Button } from 'react-bootstrap';

function Main() {
  const [count, setCount] = useState(1)
  const [selectedOption, setSelectedOption] = useState(null);
  const [formArray, setFormArray] = useState([]);
  const [combinator, setCombinator] = useState('AND');
  const handleDropdownChange = (selectedValue) => {
    
    setSelectedOption(selectedValue);

    // Add a new form data object to the array
    const newFormArray = [...formArray, { ruleType: selectedValue, id: count, combinator: combinator }];
    console.log('newFormArray', newFormArray)
    setCount(count + 1);
    setFormArray(newFormArray);
  };



  const handleDelete = (id) => {
    const updatedArray = formArray.filter((form) => id != form.id);
    setFormArray(updatedArray)
  }

  return (
    <>
      <div className={styles.header}>
        <div className="dropdown">
          <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Action
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={() => handleDropdownChange("Age")}>Age</a></li>
            <li><a className="dropdown-item" onClick={() => handleDropdownChange("Credit Score")}>Credit score</a></li>
            <li><a className="dropdown-item" onClick={() => handleDropdownChange("Account balance")}>Account balance</a></li>
          </ul>
        </div>

        <div className="form-group">
          <label htmlFor="operator" className="form-label">Operator</label>
          <select
            id="operator"
            className="aman"
            value={combinator}
            onChange={(e) => setCombinator(e.target.value)}
            required
          >
            <option value="OR">OR</option>
            <option value="AND">AND</option>
          </select>
          <div className="invalid-feedback">Operator is required.</div>
        </div>

      </div>

      <div className={styles.container}>
        <div className={styles.forms}>
          {formArray.map((formData, index) => (
            <div key={index} className={styles.cards} >
              <FormComponent formData={formData} onDelete={handleDelete}></FormComponent>
            </div>
          ))}
        </div>

        <div className={styles.output}>
          <h1 className={styles.outputHeading}>Output</h1>
          <hr />
          <Output />
        </div>
      </div>
    </>
  );
}



export default Main;