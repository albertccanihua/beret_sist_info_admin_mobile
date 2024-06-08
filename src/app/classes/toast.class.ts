import { ToastController } from "@ionic/angular";

export class Toast {
    private _isOpen: boolean = false;
    private _message: string = '';
    private _color: string = 'primary';
    private _position?: "top" | "bottom" | "middle" | undefined = 'top';

    private _toastController: ToastController

    constructor(
    ) {
        this._toastController = new ToastController();
    }

    public get isOpen(): boolean {
        return this._isOpen;
    }
    public set isOpen(value: boolean) {
        this._isOpen = value;
    }

    public get message(): string {
        return this._message;
    }
    public set message(value: string) {
        this._message = value;
    }

    public get color(): string {
        return this._color;
    }
    public set color(value: string) {
        this._color = value;
    }

    public get position(): "top" | "bottom" | "middle" | undefined {
        return this._position;
    }
    public set position(value: "top" | "bottom" | "middle" | undefined) {
        this._position = value;
    }

    // Generic methods
    // ===========================================

    setOpen(value: boolean): this {
        this.isOpen = value;
        return this;
    }

    setMessage(value: string): this {
        this.message = value;
        return this;
    }

    setColor(value: string): this {
        this.color = value;
        return this;
    }

    setPosition(value: 'top' | 'middle' | 'bottom'): this {
        this.position = value;
        return this;
    }

    async show() {
        const toast = await this._toastController.create({
            color: this.color,
            message: this.message,
            duration: 3000,
            position: this.position,
        });

        await toast.present();
    }

    // Specified methods 
    // ===========================================

    open(): this {
        this.isOpen = true;
        return this;
    }

    success(): this { this.color = 'success'; return this }
    warning(): this { this.color = 'warning'; return this }
    danger(): this { this.color = 'danger'; return this }

    incompleteDataMessage(): this { this.message = 'Faltan completar datos!'; return this; }
    createMessage(): this { this.message = 'Se registró correctamente'; return this; }
    updateMessage(): this { this.message = 'Se actualizó correctamente'; return this; }
    deleteMessage(): this { this.message = 'Se eliminó correctamente'; return this; }
    deactivateMessage(): this { this.message = 'Se desactivó correctamente'; return this; }
    processingError(): this { this.message = 'Error en el proceso, intentelo de nuevo'; return this; }
}