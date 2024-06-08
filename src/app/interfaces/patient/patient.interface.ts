export interface IPatient {
    id: number;
    document_number: string;
    dob: string;
    name: string;
    paternal_surname: string;
    user_creator: string;
    type_document: string;
    type_gender: string;
    type_financing: string;
    maternal_lastname?: string;
    email?: string;
    phone_number?: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}