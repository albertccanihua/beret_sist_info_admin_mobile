export interface IListPacketsApiResponse {
    id: number;
    name: string;
    description?: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}