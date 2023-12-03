export interface INotification {
    id: string;
    receiver: User;
    receiverId: string;
    isSeen: boolean;
    createdAt: Date;
    updatedAt: Date;
}