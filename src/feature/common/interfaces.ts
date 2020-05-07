/* eslint-disable camelcase */
export interface QuestItem {
  UUID: number;
  createdAt: Date;
  title: string;
  contents: string;
  dueDate: Date;
  checked: boolean;
  completed: boolean;
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
  password: string;
  created_at: Date;
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
  created_at: Date;
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
