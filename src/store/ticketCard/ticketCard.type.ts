export interface TrainStation {
  uuid: string;
  name: string;
  code: string;
}

export interface TrainSeat {
  carNumber: string;
  seatNumber: string;
  seatType: string;
}

export enum TrainMark {
  Student = '学',
  Discount = '惠',
  Online = '网',
}

export interface TrainPassengerInfo {
  idCard: string;
  name: string;
}

export interface TrainTicket {
  uuid: string;
  startStation: TrainStation;
  endStation: TrainStation;
  trainNumber: string;
  dateTime: Date;
  seat: TrainSeat;
  trainPay: number;
  mark: TrainMark[];
  passenger: TrainPassengerInfo;
  checking: string;
  ticketRedNumber: string;
  ticketBlackNumber: string;
  qrCode: string;
  cardInfo: string;
  cardTip: string;
  createTime: Date;
  createUser: string;
}

export interface TicketCardState {
  trainTickets: TrainTicket[];
}
