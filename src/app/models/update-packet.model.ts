import { CreateManyPacketSpecialityModel } from "./create-many-packet-speciality.model";
import { UserCreatorModel } from "./user-creator.model";

export class UpdatePacketModel {

    public id: number;
    public code: string;
    public name: string;
    public description: string | null;
    public relational_codes: string;
    public status: boolean;
    public specialities: CreateManyPacketSpecialityModel[];

    constructor() {
        this.id = 0;
        this.code = '';
        this.name = '';
        this.description = '';
        this.relational_codes = '';
        this.status = true;
        this.specialities = [];
    }
}