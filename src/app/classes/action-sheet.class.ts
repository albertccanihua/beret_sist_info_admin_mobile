export class ActionSheet {

    private _isActionSheetOpen: boolean = false;
    private _actionButtons: any = [];

    constructor() {
        this.clearButtons();
    }

    // Getters and Setters
    // ===========================================

    public get isActionSheetOpen(): boolean {
        return this._isActionSheetOpen;
    }
    public set isActionSheetOpen(value: boolean) {
        this._isActionSheetOpen = value;
    }

    public get actionButtons(): any {
        return this._actionButtons;
    }

    // Helpers
    // ===========================================

    private alreadyExistsButton(name: string): boolean {
        let sameButtons = this.actionButtons.filter((obj: any) => obj.text === name);
        return (sameButtons.length > 0) ? true : false;
    }

    // Methods
    // ===========================================

    setCancelAction(): this {
        if (!this.alreadyExistsButton('Cancelar')) {
            this._actionButtons.push({
                text: 'Cancelar',
                role: 'cancel',
                data: {
                    action: 'cancel',
                },
            });
        }
        return this;
    }

    setViewAction(name: string = 'Ver', action: () => void): this {

        if (!this.alreadyExistsButton(name)) {
            this._actionButtons.unshift({
                text: name,
                data: {
                    action: 'view',
                },
                handler: () => action()
            });
        }

        return this;
    }

    setUpdateAction(name: string = 'Actualizar', action: () => void): this {
        if (!this.alreadyExistsButton(name)) {
            this._actionButtons.unshift({
                text: name,
                data: {
                    action: 'update',
                },
                handler: () => action()
            });
        }

        return this;
    }

    setDeleteAction(name: string = 'Eliminar', action: () => void): this {

        if (!this.alreadyExistsButton(name)) {
            this._actionButtons.unshift({
                text: name,
                role: 'destructive',
                data: {
                    action: 'delete',
                },
                handler: () => action()
            });
        }
        return this;
    }

    clearButtons() {
        this._actionButtons = [];
    }

}