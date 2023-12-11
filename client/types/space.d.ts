import { PayType, SpaceType } from "./enum";
import { IUser } from "./user";

export interface iSpaceData {
    title: string;
    owner: string;
    spaceType: string;
    amount: string;
    payType: string;
    description: string;
    images: File[];
}

export interface ISpace {
    id: string;
    lng: number;
    lat: number;
    title: string;
    ownerName: string;
    spaceType: SpaceType;
    amount: string;
    payType: PayType;
    desc: string;
    creator: IUser;
    creatorId: string;
    images?: Image[];
    comments?: Comment[];
    rating?: Rating[];
    createdAt: Date;
    updatedAt: Date;
}

