import { ISpecialitiesApiFilters } from "../interfaces/speciality/specialities-api-filters.interface";

export class SpecialitiesFiltersModel implements ISpecialitiesApiFilters {

    public id?: number;
    public code?: string;
    public name?: string;
    public status?: boolean;
    public page?: number;
    public limit?: number;

}