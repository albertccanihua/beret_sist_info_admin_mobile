import { IPatientsApiFilters } from "../interfaces/patient/patients-api-filters.interface";

export class PatientFiltersModel implements IPatientsApiFilters {

    public id?: number;
    public document_number?: string;
    public name?: string;
    public paternal_surname?: string;
    public maternal_lastname?: string;
    public status?: boolean;
    public type_document?: string;
    public type_financing?: string;
    public page?: number;
    public limit?: number;

}