export type DataItem = {
  _id?: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  [key: string]: unknown;
};

// Backward-compatible alias
export type WixDataItem = DataItem;

export type DataQueryResult = {
  items: DataItem[];
  totalCount?: number;
};

export type WixDataQueryResult = DataQueryResult;
