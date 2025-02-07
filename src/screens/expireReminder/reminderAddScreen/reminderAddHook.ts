import { useDispatch } from 'react-redux';
import { addGoodAction } from '../../../store/expireReminder/expireReminder.redux';
import { Good } from '../../../store/expireReminder/expireReminder.type';

type Input = {};

type Output = {
  handleAddGood: (good: Good) => void;
};

type ExpireReminderAddHook = {
  input: Input;
  output: Output;
};

export const useExpireReminderAddHook = (): ExpireReminderAddHook => {
  const dispatch = useDispatch();

  const input: Input = {};
  const output: Output = {
    handleAddGood: good => dispatch(addGoodAction(good)),
  };

  return {
    input,
    output,
  };
};
