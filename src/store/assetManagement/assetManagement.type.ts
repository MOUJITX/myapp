export interface Asset extends AssetBasic {
  additionalFee: {
    outcome: AssetBasic[];
  };
  createTime: Date;
  createUser: string;
}

export interface AssetBasic {
  uuid: string;
  name: string;
  category: string;
  imgs: string[];
  using: boolean;
  deactivateDate?: Date;
  purchasing: Purchasing;
  warranty: Warranty;
  note: string;
}

export interface Purchasing {
  price: number;
  date: Date;
  source?: string;
  store?: string;
}

export interface Warranty {
  enabled: boolean;
  activeDate?: Date;
  overDate?: Date;
  durationDays?: number;
}

export interface AssetManagementState {
  assets: Asset[];
}
