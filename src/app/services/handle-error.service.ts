import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(
    private _toastController: ToastController,
    private router: Router
  ) { }

  throw(error: HttpErrorResponse) {

    if (error.status == 401) {
      if (error.error.message == 'Credentials are not valid') {
        this.presentToast('top', 'Usuario y/o Contraseña inválidos!');
      }

      this.router.navigateByUrl('/mobile/auth');
    } else {
      this.presentToast('top', error.error.message);
    }

    return throwError(() => error);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this._toastController.create({
      color: 'danger',
      message: message,
      duration: 10000,
      position: position,
    });

    await toast.present();
  }
}
