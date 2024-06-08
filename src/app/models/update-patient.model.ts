import { ManagementType } from "./management-type.model";

export class UpdatePatientModel {

    public id: number;
    public document_number: string;
    public dob: string;
    public name: string;
    public paternal_surname: string;
    public maternal_lastname: string;
    public email: string;
    public phone_number: string;
    public status: boolean;
    public type_document: ManagementType;
    public type_gender: ManagementType;
    public type_financing: ManagementType;

    constructor() {
        this.id = 0;
        this.document_number = '';
        this.dob = '';
        this.name = '';
        this.paternal_surname = '';
        this.maternal_lastname = '';
        this.email = '';
        this.phone_number = '';
        this.status = true;
        this.type_document = new ManagementType();
        this.type_gender = new ManagementType();
        this.type_financing = new ManagementType();

    }
}