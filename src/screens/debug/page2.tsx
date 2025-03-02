import React from 'react';
import Button from '../../components/basic/Button';
import { OSS } from '../../utils/oss';

export const PageB = () => {
  return (
    <>
      <Button label="upload" onPress={OSS} />
    </>
  );
};
