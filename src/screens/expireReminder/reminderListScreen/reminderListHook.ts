import { useDispatch, useSelector } from 'react-redux';
import { selectAllExpireReminder } from '../../../store/expireReminder/expireReminder.selectors';
import { Good } from '../../../store/expireReminder/expireReminder.type';
import { removeGoodAction } from '../../../store/expireReminder/expireReminder.redux';

type Input = {
  allExpireReminderList: Good[];
};

type Output = {
  handleRemoveGood: (good: string) => void;
};

type ExpireReminderListHook = {
  input: Input;
  output: Output;
};

export const useExpireReminderListHook = (): ExpireReminderListHook => {
  const input: Input = {
    allExpireReminderList: useSelector(selectAllExpireReminder),
  };

  const dispatch = useDispatch();

  const output: Output = {
    handleRemoveGood: (goodID: string) => {
      dispatch(removeGoodAction(goodID));
    },
  };
  return {
    input,
    output,
  };
};
