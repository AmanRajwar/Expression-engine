import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../assets/css/output.module.css';

const Output = () => {
  const outputJson = useSelector((state) => {
    return state.field;
  });

  if (!outputJson || outputJson.rules.length === 0) {
    return null;
  }

  const sanitizedOutput = {
    ...outputJson,
    rules: outputJson.rules.map(({ id, ...rest }) => rest),
  };

  return (
    <div>
      <pre className={styles.output}>{JSON.stringify(sanitizedOutput, null, 2)}</pre>
    </div>
  );
};

export default Output;
