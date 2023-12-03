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
    comments?: Comment[];
    ratings?: Rating[];
    createdAt: Date;
    updatedAt: Date;
}