export interface IConversation {
    id: string;
    participates: User[];
    messages: Messages[];
    createdAt: Date;
    updatedAt: Date;
}