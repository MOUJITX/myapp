import { useDispatch, useSelector } from 'react-redux';

import { addGoodAction } from '../../../store/expireReminder/expireReminder.redux';
import { selectAllExpireReminder } from '../../../store/expireReminder/expireReminder.selectors';
import { Good } from '../../../store/expireReminder/expireReminder.type';
import { goBackAction } from '../../../store/navigation/navigation.redux';
import { selectLoginUserUUID } from '../../../store/userProfile/userProfile.selectors';

type Input = {
  existGood: (uniCode: string) => Good | undefined;
};

type Output = {
  handleSubmitGood: (good: Good) => void;
};

type ExpireReminderAddHook = {
  input: Input;
  output: Output;
};

export const useExpireReminderAddHook = (): ExpireReminderAddHook => {
  const dispatch = useDispatch();
  const loginUser = useSelector(selectLoginUserUUID);

  const allGoods = useSelector(selectAllExpireReminder);

  const input: Input = {
    existGood: (uniCode: string) =>
      allGoods.find(g => g.uniqueCode === uniCode),
  };
  const output: Output = {
    handleSubmitGood: good => {
      dispatch(addGoodAction({ good, loginUser }));
      dispatch(goBackAction());
    },
  };

  return {
    input,
    output,
  };
};
