/* eslint-disable camelcase */
export interface QuestItem {
  _id: number;
  created_at: string;
  title: string;
  contents: string;
  due_date: string;
  checked: boolean;
  finalize: boolean;
  data: string;
}

export interface Active {
  exp_bar: StoreItem;
  background: StoreItem;
  darkmode: StoreItem;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  darkmode: boolean;
  password: string;
  created_at: string;
  __v: number;
  profilePic: string;
  motto: string;
  active: Active;
  experience: number;
  credits: number;
  quests: Array<QuestItem>;
  todolist: Array<QuestItem>;
  items: any;
}

export interface StoreItem {
  _id: string;
  item_name: string;
  category: string;
  image: string;
  created_at: string;
  price: number;
  __v: number;
}

export interface Items {
  exp_bar: Array<StoreItem>;
  background: Array<StoreItem>;
  darkmode: Array<StoreItem>;
}

export interface Store {
  background: Array<StoreItem>;
  exp_bar: Array<StoreItem>;
  darkmode: Array<StoreItem>;
}
