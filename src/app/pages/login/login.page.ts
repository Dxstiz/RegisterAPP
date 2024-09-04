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
  
  constructor(
    // INYECCION DE DEPENDENCIAS
    private router: Router, 
    private alertController: AlertController,
    private dataService: DataService
  ) { 

    // INICIALIZACION DE VARIABLES
    this.userName = '';
    this.passwordUser = '';

  }

  // FUNCION PARA INICIAR SESION
  // ASYNC SE USA PARA INTEGRAR AWAIT DENTRO DE LA FUNCION DE ESTA MANERA AL APARECER LA ALERTA SE ESPERA A QUE EL USUARIO LA CIERRE PARA CONTINUAR
  async login() {

    // SE VERIFICA QUE LOS CAMPOS DE USUARIO Y CONTRASEÑA NO ESTEN VACIOS PARA QUE EL USUARIO PUEDA INICIAR SESION
    if (this.userName.length > 0 && this.passwordUser.length > 0) {
      // SE REDIRECCIONA AL USUARIO A LA PAGINA DE HOME
      this.router.navigate(['/home']);
      this.dataService.setNombreUsuario(this.userName);
    } else {
      // SI LOS CAMPOS ESTAN VACIOS SE MUESTRA UNA ALERTA CON UN MENSAJE DE INGRESE USUARIO Y CONTRASEÑA
      const alert = await this.alertController.create({
        header: 'Acceso denegado',
        message: 'Ingrese usuario y contraseña',
        buttons: ['OK']
      });
      // AWAIT PARA ESPERAR A QUE EL USUARIO CIERRE LA ALERTA
      await alert.present();
    }
  }

  ngOnInit() {
  }

}
