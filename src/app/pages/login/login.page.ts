import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // DECLARACION DE VARIABLES
  userName: string;
  passwordUser: string;
  isPasswordShow: boolean;
  
  constructor(
    // INYECCION DE DEPENDENCIAS
    private router: Router, 
    private alertController: AlertController,
    private dataService: DataService
  ) { 

    // INICIALIZACION DE VARIABLES
    this.userName = '';
    this.passwordUser = '';
    this.isPasswordShow = false;
  }

// FUNCION PARA INICIAR SESION
async login() {
  // Verifica si ambos campos están vacíos
  if (this.userName.length === 0 && this.passwordUser.length === 0) {
    const alert = await this.alertController.create({
      header: 'Acceso denegado',
      message: 'Debe ingresar usuario y contraseña',
      buttons: ['OK']
    });
    await alert.present();
  } 
  // Verifica si solo el campo de usuario está vacío
  else if (this.userName.length === 0) {
    const alert = await this.alertController.create({
      header: 'Acceso denegado',
      message: 'Debe ingresar el usuario',
      buttons: ['OK']
    });
    await alert.present();
  } 
  // Verifica si solo el campo de contraseña está vacío
  else if (this.passwordUser.length === 0) {
    const alert = await this.alertController.create({
      header: 'Acceso denegado',
      message: 'Debe ingresar la contraseña',
      buttons: ['OK']
    });
    await alert.present();
  } 
  // Si ambos campos están llenos, redirige a la página de inicio
  else {
    this.router.navigate(['/home']);
    this.dataService.setNombreUsuario(this.userName);
  }
}

  showPassword(){
    this.isPasswordShow = !this.isPasswordShow;
  }


  ngOnInit() {
  }

  goForgot() {
    this.router.navigate(['/forgot-pass']);
  }
}
