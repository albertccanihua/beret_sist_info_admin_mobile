import { IManagementType } from "../management-type/management-type.interface";

export interface IShowTreatmentAPIResponse {
    id: number;
    code: string;
    name: string;
    status: boolean;
    acceptance_rate: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    patient: IPatientTreatment;
    type_status_treatment: IManagementType;
    treatment_specialities: ITreatmentSpecialityElement[];
}

export interface IPatientTreatment {
    id: number;
    document_number: string;
    dob: string;
    name: string;
    paternal_surname: string;
    maternal_lastname?: string;
    email?: string;
    phone_number?: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    type_financing: IManagementType;
    type_document: IManagementType;
    type_gender: IManagementType;
}

export interface ITreatmentSpecialityElement {
    id: number;
    sessions: number;
    sessions_taken: number;
    speciality: IManagementType;
    treatment_assistances: ITreatmentAssistance[];
}

export interface ITreatmentAssistance {
    id: number;
    date_appointment: Date;
    date_care: Date;
    status: boolean;
    created_at: Date;
    treatment_speciality: ITreatmentAssistanceTreatmentSpeciality;
    profesional: IProfesional;
}

export interface IProfesional {
    id: number;
    document_number: string;
    dob: Date;
    name: string;
    paternal_surname: string;
    maternal_lastname: string;
    email: string;
    phone_number?: string;
    username: string;
    password: string;
    status: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

export interface ITreatmentAssistanceTreatmentSpeciality {
    id: number;
    sessions: number;
    sessions_taken: number;
}
