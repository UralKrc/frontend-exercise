export interface Item {
  id: string;
  name: string;
  category?: string;
}

export interface GetItemsResponse {
  items: Item[];
}

export interface SearchItemsResponse {
  searchItems: Item[];
}
