export class CreateTreatmentRequestModel {

    public user_creator: number;
    public patient: string;

    constructor() {
        this.user_creator = 0;
        this.patient = '';
    }

}