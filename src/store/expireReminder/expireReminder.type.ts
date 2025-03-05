export enum ExpiryStatus {
  Valid = 'valid',
  Soon = 'soon',
  Expired = 'expired',
  Used = 'used',
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
  isUsed: boolean;
  createTime: Date;
}

export interface GoodBrand {
  brand?: string;
  producer?: string;
}

export interface Good {
  goodID: string;
  title: string;
  uniqueCode: string;
  imgs: string[];
  type: string;
  brand?: GoodBrand;
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
