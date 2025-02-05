export enum ExpiryStatus {
  Valid = 'valid',
  Soon = 'soon',
  Expired = 'expired',
}

export enum GoodType {
  Medicine = 'medicine',
  Food = 'food',
  Other = 'other',
}

export interface GoodItem {
  itemID: string;
  productionDate?: Date;
  expireDate?: Date;
  createTime: Date;
}

export interface Good {
  goodID: string;
  title: string;
  uniqueCode: string;
  img?: string;
  type: GoodType;
  detail: {
    dosage?: string;
    frequency?: string;
    storage?: string;
  };
  items: GoodItem[];
  createTime: Date;
}

export interface ExpireReminderState {
  goodsList: Good[];
}
