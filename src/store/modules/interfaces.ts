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
    experiencebar: number;
    background: number;
    darkmode: boolean;
}

export interface User {
    UUID: number;
    username: string;
    password: string;
    email: string;
    profilePic: string;
    motto: string;
    active: Active;
    experience:number;
    credit: number;
    quests: Array<QuestItem>;
}


export interface StoreItem{
    UUID : number;
    name : string;
    price : number;
}

export interface Items{
    experiencebar : Array<StoreItem>;
    background : Array<StoreItem>;
}

export interface UserCollection {
    user :User;
    todolist : Array<QuestItem>;
    items : Items;
}

export interface Store {
    background : Array<StoreItem>;
    experienceBar : Array<StoreItem>;
}
