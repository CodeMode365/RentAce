export interface IMessage {
    id: string;
    content: string;
    sender: User;
    receiver: Conversation;
    senderId: string;
    conversationId: string;
    createdAt: Date;
    updatedAt: Date;
}