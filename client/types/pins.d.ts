export interface IPin {
    id: string;
    title: string;
    desc: string;
    rating: number;
    lat: number;
    long: number;
    createdAt?: Date | string;
    updateAt?: Date | string;
}