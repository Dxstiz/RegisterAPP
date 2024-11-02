import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../common/services/auth.service';
import { UserCredential } from '@angular/fire/auth';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Declaración de variables
  userName: string;
  passwordUser: string;
  isPasswordShow: boolean;

  email: string;
  password: string;

  constructor(
    private router: Router, 
    private alertController: AlertController,
    private authService: AuthService,
    private dataService: DataService
  ) { 
    this.userName = '';
    this.passwordUser = '';
    this.isPasswordShow = false;
  }

  // Función de inicio de sesión
  async login() {
    this.authService.login(this.email, this.password)
      .then((userCredential: UserCredential) => {
        const uid = userCredential.user.uid;  // Obtén el uid del usuario autenticado
        console.log('UID del usuario autenticado:', uid);  // Muestra el uid en la consola
        this.dataService.setUid(uid);  // Guarda el uid en el servicio de datos
        this.router.navigate(['/home']);
      })
      .catch(async error => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Correo o contraseña incorrectos',
          buttons: ['OK']
        });
        await alert.present();
      });
  }


  showPassword() {
    this.isPasswordShow = !this.isPasswordShow;
  }

  ngOnInit() {}

  goForgot() {
    this.router.navigate(['/forgot-pass']);
  }
}

