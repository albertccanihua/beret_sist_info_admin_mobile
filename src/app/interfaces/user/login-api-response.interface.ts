export interface ILoginAPIResponse {
    code: number;
    status: string;
    result: Result;
}

export interface Result {
    id: number;
    document_number: string;
    dob: Date;
    name: string;
    paternal_surname: string;
    maternal_lastname: string;
    email: string;
    phone_number: string;
    username: string;
    status: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    type_document: Type;
    type_gender: Type;
    type_role: Type;
    token: string;
}

export interface Type {
    id: number;
    code: null;
    name: string;
    description: null;
    data: null;
    type: string;
    status: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
