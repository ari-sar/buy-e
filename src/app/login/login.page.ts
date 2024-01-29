import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  password: string = '';
  constructor(
    private toastController: ToastController,
    private router: Router,
    private authService: AuthService
  ) {
    if (localStorage.getItem('hasLoggedIn')) {
      router.navigateByUrl('/screens')
    }
  }


  signIn() {
    if (this.password === 'dummy@123') {
      this.authService.login();
      this.presentToast('Login Success', 'success');
      localStorage.setItem('hasLoggedIn', 'true');
      this.router.navigateByUrl('screens')
    } else if (this.password === '') {
      this.presentToast('Password is empty', 'warning')
    } else {
      this.presentToast('Wrong Password', 'danger')
    }
  }

  async presentToast(message: string, color: string, position?: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      color: color,
      position: 'top',
      mode: 'md'
    });
    await toast.present();
  }

}
