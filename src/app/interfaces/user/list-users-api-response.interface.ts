import { IManagementType } from "../management-type/management-type.interface";

export interface IListUserApiResponse {
    id?: number;
    document_number: string;
    dob: string;
    name: string;
    paternal_surname: string;
    maternal_lastname?: string;
    email?: string;
    phone_number?: string;
    username: string;
    password: string;
    status?: boolean;
    type_document: IManagementType;
    type_gender: IManagementType;
    type_role: IManagementType;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}