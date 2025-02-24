import { useDispatch, useSelector } from 'react-redux';
import {
  selectTrainQuickSelectItems,
  selectTrainQuickSelectItemsWithLoginUser,
} from '../../../store/ticketCard/ticketCard.selector';
import { SelectItem } from '../../../components/basic/SelectOptionList';
import { selectLoginUserUUID } from '../../../store/userProfile/userProfile.selectors';
import {
  trainSelectAddAction,
  trainSelectRemoveAction,
  trainSelectUpdateAction,
  trainTicketsSubmitAction,
} from '../../../store/ticketCard/ticketCard.redux';
import {
  TrainQuickSelect,
  TrainTicket,
} from '../../../store/ticketCard/ticketCard.type';

type Input = {
  quickSelectStations: SelectItem[];
  quickSelectChecks: SelectItem[];
  quickSelectPassengers: SelectItem[];
  createUser: string;
};

type Output = {
  quickSelectItemRemove: (key: keyof TrainQuickSelect, id: string) => void;
  quickSelectItemAdd: (key: keyof TrainQuickSelect, item: SelectItem) => void;
  quickSelectItemUpdate: (
    key: keyof TrainQuickSelect,
    item: SelectItem
  ) => void;
  trainTicketSubmit: (ticket: TrainTicket) => void;
};

type TicketCardAddHook = {
  input: Input;
  output: Output;
};

export const useTicketCardAddHook = (): TicketCardAddHook => {
  const createUser = useSelector(selectLoginUserUUID);

  const input: Input = {
    quickSelectStations: useSelector(selectTrainQuickSelectItems('stations')),
    quickSelectChecks: useSelector(selectTrainQuickSelectItems('checks')),
    quickSelectPassengers: useSelector(
      selectTrainQuickSelectItemsWithLoginUser('passengers')
    ),
    createUser: createUser ?? '',
  };

  const dispatch = useDispatch();

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
    trainTicketSubmit: ticket => dispatch(trainTicketsSubmitAction(ticket)),
  };

  return {
    input,
    output,
  };
};
