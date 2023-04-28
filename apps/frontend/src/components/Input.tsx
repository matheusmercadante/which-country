import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

interface InputProps {
  name: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
};

export default Input;
