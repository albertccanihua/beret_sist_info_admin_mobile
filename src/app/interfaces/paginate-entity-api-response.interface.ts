export interface IPaginateEntityApiResponse<T> {
    data: T;
    page: number;
    total_data: number;
    total_page: number;
}