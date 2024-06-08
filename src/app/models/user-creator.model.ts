export class UserCreatorModel {
    public id: number;
    public name: string;
    public paternal_surname: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.paternal_surname = '';
    }
}