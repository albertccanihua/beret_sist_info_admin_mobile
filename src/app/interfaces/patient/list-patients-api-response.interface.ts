import { IManagementType } from "../management-type/management-type.interface";

export interface IListPatientsApiResponse {
    id: number;
    document_number: string;
    dob: string;
    name: string;
    paternal_surname: string;
    maternal_lastname?: string;
    email?: string;
    phone_number: string;
    status: boolean;
    type_document: IManagementType;
    type_gender: IManagementType;
    type_financing: IManagementType;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}