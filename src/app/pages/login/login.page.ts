import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/common/service/auth.service';

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
  ) { 
    this.userName = '';
    this.passwordUser = '';
    this.isPasswordShow = false;
  }

  // Función de inicio de sesión
  async login() {
    
      // Validar campos
      if (!this.email || !this.password) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Debes llenar todos los campos',
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }

      

      const loginData = { email: this.email, password: this.password };
      let endpoint = '';
      let isStudent = false;

      // Verificar si el usuario es un estudiante o un profesor
      if (this.email.includes('@estudiante.com')) {
        endpoint = 'students/login';
        isStudent = true;
      } else if (this.email.includes('@profesor.com')) {
        endpoint = 'teachers/login';
      }

      this.authService.login(endpoint, loginData).subscribe(
        (response) => {
    
          // Guardar datos del usuario en localStorage
          const user = isStudent ? response.student : response.teacher;
          user.isStudent = isStudent;

          localStorage.setItem('userData', JSON.stringify(user));

          // Redirigir al usuario
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
        }
      );
      
    }
  
  
  

  showPassword() {
    this.isPasswordShow = !this.isPasswordShow;
  }

  ngOnInit() {}

  goForgot() {
    this.router.navigate(['/forgot-pass']);
  }
}

