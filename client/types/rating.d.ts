export interface IRating {
    id: string;
    star: number;
    Space: Space;
    spaceId: string;
    ratedBy: User;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}