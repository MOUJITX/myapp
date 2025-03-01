import React from 'react';
import { useState } from 'react';
import TextInputCustom from './components/basic/TextInputCustom';

export const PageC = () => {
  const [value, setValue] = useState<string>('');
  return (
    <TextInputCustom
      label="123"
      inline
      keyboardType="trainNumber"
      value={value}
      onValueChange={setValue}
    />
  );
};
