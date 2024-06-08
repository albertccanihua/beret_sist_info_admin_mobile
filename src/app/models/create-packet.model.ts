import { CreateManyPacketSpecialityModel } from "./create-many-packet-speciality.model";

export class CreatePacketModel {

    public user_creator: number;
    public code: string;
    public name: string;
    public description: string;
    public relational_codes: string;
    public specialities: CreateManyPacketSpecialityModel[];

    constructor() {
        this.user_creator = 0;
        this.code = '';
        this.name = '';
        this.description = '';
        this.relational_codes = '';
        this.specialities = [];
    }

    reset() {
        this.user_creator = 0;
        this.code = '';
        this.name = '';
        this.description = '';
        this.relational_codes = '';
        this.specialities = [];
    }
}

