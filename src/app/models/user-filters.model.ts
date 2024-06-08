import { IUsersApiFilters } from "../interfaces/user/users-api-filters.interface";

export class UserFiltersModel implements IUsersApiFilters {

    public id?: number;
    public document_number?: string;
    public name?: string;
    public paternal_surname?: string;
    public maternal_lastname?: string;
    public status?: boolean;
    public type_document?: string;
    public type_role?: string;
    public page?: number;
    public limit?: number;

}