import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from '../../data.service';
import { AuthService } from '../../auth.service';

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
    private dataService: DataService,
    private authService: AuthService
  ) { 

    // INICIALIZACION DE VARIABLES
    this.userName = '';
    this.passwordUser = '';
    this.isPasswordShow = false;
  }



  async login(){
    if (this.authService.login(this.userName, this.passwordUser)){
      this.router.navigate(['/home'], { state: { userName: this.userName } });
      this.dataService.setNombreUsuario(this.userName);
    } else {
      const alert = await this.alertController.create({
        header: 'Acceso denegado',
        message: 'Usuario o contraseña incorrecta',
        buttons: ['OK']
      });
      await alert.present();
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


