export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    userType: UserType;
    Image?: Image[];
    spaces?: Space[];
    messages?: Messages[];
    conversations?: Conversation[];
    notification?: Notification[];
    userInfo?: IUserInfo;
    comments?: Comment[];
    ratings?: Rating[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserInfo {
    id: string;
    Bio: string?;
    phone: string?;
    Address: string?;
    Country: string?;
    State: string?;
    City: string?;
    Zip: string?;
    User: IUser?;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
}