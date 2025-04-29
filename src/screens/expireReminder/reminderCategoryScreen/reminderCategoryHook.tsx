import { useDispatch, useSelector } from 'react-redux';
import { GoodCategory } from '../../../store/expireReminder/expireReminder.type';
import { selectAllGoodCategory } from '../../../store/expireReminder/expireReminder.selectors';
import {
  addCategoryAction,
  removeCategoryAction,
  updateCategoryAction,
} from '../../../store/expireReminder/expireReminder.redux';
import { selectLoginUserUUID } from '../../../store/userProfile/userProfile.selectors';

type Input = {
  allCategories: GoodCategory[];
  allCategoriesHideAll: GoodCategory[];
};

type Output = {
  addCategory: (label: string) => void;
  removeCategory: (id: string) => void;
  updateCategory: (id: string, label: string) => void;
};

type ReminderCategoryHook = {
  input: Input;
  output: Output;
};

export const useReminderCategoryHook = (): ReminderCategoryHook => {
  const input: Input = {
    allCategories: useSelector(selectAllGoodCategory),
    allCategoriesHideAll: useSelector(selectAllGoodCategory).filter(
      c => c.categoryID !== 'all',
    ),
  };

  const dispatch = useDispatch();
  const createUser = useSelector(selectLoginUserUUID);

  const output: Output = {
    addCategory: (label: string) =>
      createUser && dispatch(addCategoryAction({ label, createUser })),
    removeCategory: (id: string) => dispatch(removeCategoryAction(id)),
    updateCategory: (id: string, label: string) =>
      dispatch(updateCategoryAction({ categoryID: id, newLabel: label })),
  };

  return {
    input,
    output,
  };
};
