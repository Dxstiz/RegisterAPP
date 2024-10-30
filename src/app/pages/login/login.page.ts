import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from '../../data.service';
import { AuthService } from '../../common/services/auth.service';

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

  email: string;
  password: string;
  
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


  // FUNCIONES
  login() {
    this.authService.login(this.email, this.password)
    .then((user) => console.log('Inicio de sesión exitoso', user))
    .catch((error) => console.log('Error al iniciar sesión', error));
    this.router.navigate(['/home']);
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


