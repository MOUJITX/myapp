import { SelectItem } from '../../../components/basic/SelectOptionList';

const cardInfos: string[] = [
  ',已检',
  '限乘当日当次车,',
  ',始发改签 仅供报销使用',
  '退票费,仅供报销使用',
  ',仅供报销使用',
  '仅供报销使用,加收0.0元',
];

const cardTips: string[] = [
  '买票请到12306 发货请到95306,中国铁路祝您旅途愉快',
  '报销凭证 遗失不补,退票改签时须交回车站',
  '欢度国庆 祝福祖国,中国铁路祝您旅途愉快',
];

export const seatsBed: string[] = [
  '高级动卧',
  '动卧',
  '新空调硬卧',
  '新空调软卧',
  '新空调高级软卧',
  '硬卧',
  '软卧',
  '高级软卧',
  '一等卧',
  '二等卧',
  '一人软包',
];

const seats: string[] = [
  '无座',
  '商务座',
  '特等座',
  '优选一等座',
  '一等座',
  '二等座',
  '新空调硬座',
  '新空调软座',
  '硬座',
  '软座',
  '一等软座',
  '二等软座',
  '硬卧代硬座',
  '卧代一等座',
  '卧代二等座',
  ...seatsBed,
];

export const carsSkipSeatType: string[] = ['不对号入座'];
export const carsSkipSeatNumber: string[] = [...carsSkipSeatType, '无座'];

const cars: string[] = [
  ...carsSkipSeatNumber,
  ...Array.from({ length: 20 }, (_, i) => `${i < 9 ? '0' : ''}${i + 1}`),
  ...Array.from({ length: 8 }, (_, i) => `加${i + 1}`),
];

export const TrainTicketCardInfos: SelectItem[] = cardInfos.map(item => ({
  value: item,
  label: item,
}));

export const TrainTicketCardTips: SelectItem[] = cardTips.map(item => ({
  value: item,
  label: item,
}));

export const TrainTicketCardSeatType: SelectItem[] = seats.map(item => ({
  value: item,
  label: item,
}));

export const TrainTicketCardCarNumber: SelectItem[] = cars.map(item => ({
  value: item,
  label: carsSkipSeatNumber.includes(item) ? item : `${item}车`,
}));
