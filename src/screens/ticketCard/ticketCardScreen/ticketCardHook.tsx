import { useDispatch, useSelector } from 'react-redux';
import { TrainTicket } from '../../../store/ticketCard/ticketCard.type';
import { selectTrainTickets } from '../../../store/ticketCard/ticketCard.selector';
import { trainTicketsRemoveAction } from '../../../store/ticketCard/ticketCard.redux';

type Input = {
  trainTickets: TrainTicket[];
};

type Output = {
  trainTicketRemove: (id: string) => void;
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
    trainTicketRemove: (id: string) => {
      dispatch(trainTicketsRemoveAction(id));
    },
  };

  return {
    input,
    output,
  };
};
