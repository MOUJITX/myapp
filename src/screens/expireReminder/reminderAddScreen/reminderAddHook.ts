import { useDispatch, useSelector } from 'react-redux';
import { addGoodAction } from '../../../store/expireReminder/expireReminder.redux';
import { Good } from '../../../store/expireReminder/expireReminder.type';
import { selectLoginUserUUID } from '../../../store/userProfile/userProfile.selectors';

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
  const loginUser = useSelector(selectLoginUserUUID);

  const input: Input = {};
  const output: Output = {
    handleAddGood: good => dispatch(addGoodAction({ good, loginUser })),
  };

  return {
    input,
    output,
  };
};
