import { IUserCreator } from "../user/user-creator.interface";

export interface IShowPacketApiResponse {
    id: number;
    code: string;
    name: string;
    description: string | null;
    relational_codes: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    user_creator: IUserCreator;
    packet_specialities: IPacketSpecialities[];
}

export interface IPacketSpecialities {
    id: number;
    sessions: number;
    speciality: IPacketSpeciality
}

export interface IPacketSpeciality {
    id: number;
    code: string;
    name: string;
}