import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  async presentToast(message: string, color?: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      color: color ? color : 'success',
      position: 'top',
      mode: 'md'
    });
    await toast.present();
  }

  async presentAlert(header?: string, message?: string) {
    const alert = await this.alertController.create({
      header: header ? header : '',
      subHeader: '',
      message: message ? message : '',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
