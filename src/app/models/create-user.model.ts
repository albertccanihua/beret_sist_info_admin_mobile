import { ManagementType } from "./management-type.model";

export class CreateUserModel {
    public document_number: string;
    public dob: string;
    public name: string;
    public paternal_surname: string;
    public maternal_lastname: string;
    public email: string;
    public phone_number: string;
    public username: string;
    public password: string;
    public confirm_password: string;
    public status: boolean;
    public type_document: ManagementType;
    public type_gender: ManagementType;
    public type_role: ManagementType;

    constructor() {
        this.document_number = '';
        this.dob = '';
        this.name = '';
        this.paternal_surname = '';
        this.maternal_lastname = '';
        this.email = '';
        this.phone_number = '';
        this.username = '';
        this.password = '';
        this.confirm_password = '';
        this.status = true;
        this.type_document = new ManagementType();
        this.type_gender = new ManagementType();
        this.type_role = new ManagementType();
    }

    reset() {
        this.document_number = '';
        this.dob = '';
        this.name = '';
        this.paternal_surname = '';
        this.maternal_lastname = '';
        this.email = '';
        this.phone_number = '';
        this.username = '';
        this.password = '';
        this.confirm_password = '';
        this.status = true;
        this.type_document = new ManagementType();
        this.type_gender = new ManagementType();
        this.type_role = new ManagementType();
    }
}