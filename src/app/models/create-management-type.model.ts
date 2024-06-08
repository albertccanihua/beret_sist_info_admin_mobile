export class CreateManagementTypeModel {
    public name: string;
    public description: string;
    public type: string;

    constructor() {
        this.name = '';
        this.description = '';
        this.type = '';
    }

    reset() {
        this.name = '';
        this.description = '';
        this.type = '';
    }
}