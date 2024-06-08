export interface IApiResponse<T> {
    code: number;
    status: string;
    message?: string;
    result: T
}