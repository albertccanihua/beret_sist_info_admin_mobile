export interface IPatientsApiFilters {
    id?: number;
    document_number?: string;
    name?: string;
    paternal_surname?: string;
    maternal_lastname?: string;
    status?: boolean;
    type_document?: string;
    type_financing?: string;
    page?: number;
    limit?: number;
}