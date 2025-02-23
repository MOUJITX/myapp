import { useDispatch, useSelector } from 'react-redux';
import { selectTrainQuickSelectItems } from '../../../store/ticketCard/ticketCard.selector';
import { SelectItem } from '../../../components/basic/SelectOptionList';
import { selectLoginUserUUID } from '../../../store/userProfile/userProfile.selectors';
import {
  trainSelectAddAction,
  trainSelectRemoveAction,
  trainSelectUpdateAction,
} from '../../../store/ticketCard/ticketCard.redux';
import { TrainQuickSelect } from '../../../store/ticketCard/ticketCard.type';

type Input = {
  quickSelectStations: SelectItem[];
  quickSelectChecks: SelectItem[];
  quickSelectPassengers: SelectItem[];
};

type Output = {
  quickSelectItemRemove: (key: keyof TrainQuickSelect, id: string) => void;
  quickSelectItemAdd: (key: keyof TrainQuickSelect, item: SelectItem) => void;
  quickSelectItemUpdate: (
    key: keyof TrainQuickSelect,
    item: SelectItem
  ) => void;
};

type TicketCardAddHook = {
  input: Input;
  output: Output;
};

export const useTicketCardAddHook = (): TicketCardAddHook => {
  const input: Input = {
    quickSelectStations: useSelector(selectTrainQuickSelectItems('stations')),
    quickSelectChecks: useSelector(selectTrainQuickSelectItems('checks')),
    quickSelectPassengers: useSelector(
      selectTrainQuickSelectItems('passengers')
    ),
  };

  const dispatch = useDispatch();
  const createUser = useSelector(selectLoginUserUUID);

  const output: Output = {
    quickSelectItemAdd: (key, item) =>
      dispatch(
        trainSelectAddAction({
          key,
          item: {
            ...item,
            createUser,
          },
        })
      ),
    quickSelectItemRemove: (key, id) =>
      dispatch(trainSelectRemoveAction({ key, value: id })),
    quickSelectItemUpdate: (key, item) =>
      dispatch(trainSelectUpdateAction({ key, item })),
  };

  return {
    input,
    output,
  };
};
