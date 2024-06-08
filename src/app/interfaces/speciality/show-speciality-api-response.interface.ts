import { IUserCreator } from "../user/user-creator.interface";

export interface IShowSpecialityApiResponse {
    id: number;
    code: string;
    name: string;
    description?: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    user_creator: IUserCreator;
}