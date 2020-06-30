import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export const InputCS = ({ name, rows, multiline, ...rest }: any) => {
  const InputCSRef = useRef(null);
  const { fieldName, error, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({ name: fieldName, ref: InputCSRef.current, path: 'value' });
  }, [fieldName, registerField]);

  return (
    <div>
      <input ref={InputCSRef} {...rest} rows={rows} multiline={multiline} />
      {error ? <span style={{ color: '#f00' }}> {error}</span> : undefined}
    </div>
  );
};
