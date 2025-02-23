import { useSelector } from 'react-redux';
import { TrainTicket } from '../../../store/ticketCard/ticketCard.type';
import { selectTrainTickets } from '../../../store/ticketCard/ticketCard.selector';

type Input = {
  trainTickets: TrainTicket[];
};

type Output = {};

type TicketCardHook = {
  input: Input;
  output: Output;
};

export const useTicketCardHook = (): TicketCardHook => {
  const input: Input = {
    trainTickets: useSelector(selectTrainTickets),
  };

  const output: Output = {};

  return {
    input,
    output,
  };
};
