export interface IShowMassiveUploadAPIResponse {
    id: number;
    filename: string;
    status: boolean;
    created_at: Date;
    massive_upload_items: MassiveUploadItem[];
}

export interface MassiveUploadItem {
    id: number;
    item: string;
    reason: string;
    status: boolean;
    created_at: Date;
}
