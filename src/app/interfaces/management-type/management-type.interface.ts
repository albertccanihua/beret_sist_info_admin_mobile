export interface IManagementType {
    id: number;
    code?: string;
    name: string;
    description?: string;
    data?: string;
    type: string;
    status: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}