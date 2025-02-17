import { useDispatch, useSelector } from 'react-redux';
import { addGoodAction } from '../../../store/expireReminder/expireReminder.redux';
import { Good } from '../../../store/expireReminder/expireReminder.type';
import { selectLoginUserUUID } from '../../../store/userProfile/userProfile.selectors';
import { selectAllGoodCategory } from '../../../store/expireReminder/expireReminder.selectors';

type Input = {
  categoryLabel: (id: string) => string;
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
  const categoriesList = useSelector(selectAllGoodCategory);

  const input: Input = {
    categoryLabel: id =>
      categoriesList.find(c => c.categoryID === id)?.label ?? '',
  };
  const output: Output = {
    handleSubmitGood: good => dispatch(addGoodAction({ good, loginUser })),
  };

  return {
    input,
    output,
  };
};
