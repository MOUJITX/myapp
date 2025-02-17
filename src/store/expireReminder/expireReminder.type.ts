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

export interface GoodCategory {
  categoryID: string;
  label: string;
  createUser: string;
  isDefault: boolean;
}

export interface GoodItem {
  itemID: string;
  productionDate?: Date;
  expireDate?: Date;
  lifeDays?: number;
  createTime: Date;
}

export interface Good {
  goodID: string;
  title: string;
  uniqueCode: string;
  imgs: string[];
  type: string;
  detail: {
    dosage?: string;
    frequency?: string;
    storage?: string;
  };
  items: GoodItem[];
  createTime: Date;
  createUser?: string;
}

export interface ExpireReminderState {
  goodsList: Good[];
  categoriesList: GoodCategory[];
}
