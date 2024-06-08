export interface ITreatment {

    id: number;
    code: string;
    name: string;
    status: boolean;
    acceptance_rate: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string;

}