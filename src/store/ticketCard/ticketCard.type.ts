import { SelectItem } from '../../components/basic/SelectOptionList';

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
  Cash = '现',
  Disc = '折',
  Child = '孩',
  Alipay = '支',
  WeChat = '微',
}

export interface TrainPassengerInfo {
  uuid: string;
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
  paperType?: 'blue' | 'red';
  createTime: Date;
  createUser: string;
}

export interface SelectItemWithUser extends SelectItem {
  createUser?: string;
  createTime?: Date;
}

export interface TrainQuickSelect {
  stations: SelectItemWithUser[];
  checks: SelectItemWithUser[];
  // seatTypes: SelectItemWithUser[];
  // seatCars: SelectItemWithUser[];
  // seatNumbers: SelectItemWithUser[];
  passengers: SelectItemWithUser[];
  // cardInfos: SelectItemWithUser[];
  // cardTips: SelectItemWithUser[];
}

export interface TicketCardState {
  trainTickets: TrainTicket[];
  trainSelect: TrainQuickSelect;
}
