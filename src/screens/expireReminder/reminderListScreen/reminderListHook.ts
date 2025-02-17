import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllExpireReminder,
  selectAllGoodCategory,
} from '../../../store/expireReminder/expireReminder.selectors';
import {
  Good,
  GoodCategory,
} from '../../../store/expireReminder/expireReminder.type';
import { removeGoodAction } from '../../../store/expireReminder/expireReminder.redux';

type Input = {
  allExpireReminderList: Good[];
  categoryExpireReminderList: (category: string) => Good[];
  allGoodCategoriesList: GoodCategory[];
};

type Output = {
  handleRemoveGood: (good: string) => void;
};

type ExpireReminderListHook = {
  input: Input;
  output: Output;
};

export const useExpireReminderListHook = (): ExpireReminderListHook => {
  const allExpireReminderList = useSelector(selectAllExpireReminder);

  const input: Input = {
    allExpireReminderList,
    categoryExpireReminderList: (category: string) =>
      allExpireReminderList.filter(g => g.type === category),
    allGoodCategoriesList: useSelector(selectAllGoodCategory),
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
