import { useDispatch, useSelector } from 'react-redux';

import { navigateAction } from '../../../store/navigation/navigation.redux';
import { trainTicketsRemoveAction } from '../../../store/ticketCard/ticketCard.redux';
import { selectTrainTickets } from '../../../store/ticketCard/ticketCard.selector';
import { TrainTicket } from '../../../store/ticketCard/ticketCard.type';

type Input = {
  trainTickets: TrainTicket[];
};

type Output = {
  trainTicketRemove: (id: string) => void;
  gotoTicketAddScreen: (ticket?: TrainTicket) => void;
};

type TicketCardHook = {
  input: Input;
  output: Output;
};

export const useTicketCardHook = (): TicketCardHook => {
  const input: Input = {
    trainTickets: useSelector(selectTrainTickets),
  };

  const dispatch = useDispatch();

  const output: Output = {
    trainTicketRemove: (id: string) => dispatch(trainTicketsRemoveAction(id)),
    gotoTicketAddScreen: (ticket?: TrainTicket) =>
      dispatch(
        navigateAction({
          screen: 'TicketCardAddScreen',
          params: { ticket },
        }),
      ),
  };

  return {
    input,
    output,
  };
};
