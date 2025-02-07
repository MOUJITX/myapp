import { useSelector } from 'react-redux';
import { selectAllExpireReminder } from '../../../store/expireReminder/expireReminder.selectors';
import { Good } from '../../../store/expireReminder/expireReminder.type';

type Input = {
  allExpireReminderList: Good[];
};

type Output = {};

type ExpireReminderListHook = {
  input: Input;
  output: Output;
};

export const useExpireReminderListHook = (): ExpireReminderListHook => {
  const input: Input = {
    allExpireReminderList: useSelector(selectAllExpireReminder),
  };

  const output: Output = {};
  return {
    input,
    output,
  };
};
