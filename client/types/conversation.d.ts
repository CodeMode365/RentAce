import { IUser } from "./user";
import { IMessage } from "./message"
export interface IConversation {
    id: string;
    participates: IUser[];
    messages: IMessage[];
    createdAt: Date;
    updatedAt: Date;
}