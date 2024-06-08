export interface IGetUsersApiResponse {

    id: number;
    document_number: string;
    dob: string;
    name: string;
    paternal_surname: string;
    maternal_lastname: string;
    email: string;
    phone_number?: string,
    status: boolean;
    created_at: string;
    updated_at: string;
    deleted_at?: string;

}