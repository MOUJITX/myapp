import { useSelector } from 'react-redux';
import { RootState } from '../../../store/type';
import { selectAll } from '../../../store/userProfile/userProfile.selectors';

type Input = {
  allStateData: RootState;
};

type Output = {};

type BackupDataHook = {
  input: Input;
  output: Output;
};

export const useBackupDataHook = (): BackupDataHook => {
  const input: Input = {
    allStateData: useSelector(selectAll),
  };

  const output: Output = {};

  return {
    input,
    output,
  };
};
