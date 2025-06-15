// Ruta: src/app/pages/lab/lab.page.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

import { FirestoreService } from 'src/app/common/services/firestore.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { UserI } from 'src/app/common/models/users.models';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.page.html',
})
export class LabPage implements OnInit {

  usuarios$: Observable<UserI[]>;
  isModalOpen = false;
  editingUser: any = {};
  
  // =========== ¡AQUÍ ESTÁ LA CORRECCIÓN! ===========
  // Quitamos la barra final para evitar el //
  private path = 'Usuarios'; 
  // ===============================================

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.usuarios$ = this.firestoreService.getCollectionChanges<UserI>(this.path);
  }

  openUserModal(user: UserI = null) {
    if (user) {
      this.editingUser = { ...user };
    } else {
      this.editingUser = { id: null, userName: '', correo: '', password: '', rol: 'alumno' };
    }
    this.isModalOpen = true;
  }

  closeUserModal() {
    this.isModalOpen = false;
  }

  async saveUser() {
    // --- LÓGICA DE ACTUALIZACIÓN ---
    if (this.editingUser.id) {
      try {
        const dataToUpdate = { ...this.editingUser };
        delete dataToUpdate.id;
        delete dataToUpdate.password;

        await this.firestoreService.updateDocumentID(dataToUpdate, this.path, this.editingUser.id);
        this.closeUserModal();
        this.presentAlert('Éxito', 'Usuario actualizado correctamente.');

      } catch (error) {
        console.error("Error al actualizar usuario:", error);
        this.presentAlert('Error al actualizar', 'No se pudo actualizar el usuario.');
      }
    } else {
      // --- LÓGICA DE CREACIÓN ---
      try {
        const userData = {
          userName: this.editingUser.userName,
          correo: this.editingUser.correo,
          rol: this.editingUser.rol
        };

        if (!this.editingUser.password || this.editingUser.password.length < 6) {
           this.presentAlert('Error', 'La contraseña es obligatoria y debe tener al menos 6 caracteres.');
           return;
        }

        await this.authService.register(this.editingUser.correo, this.editingUser.password, userData);
        this.closeUserModal();
        this.presentAlert('Éxito', 'Usuario creado correctamente.');
        
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
        this.presentAlert('Error al crear usuario', this.getErrorMessage(error));
      }
    }
  }

  async confirmDeleteUser(userId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres eliminar a este usuario?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.firestoreService.deleteDocumentID(this.path, userId);
              this.presentAlert('Éxito', 'Usuario eliminado correctamente.');
            } catch (error) {
              console.error("Error al eliminar usuario:", error);
              this.presentAlert('Error al eliminar', 'No se pudo eliminar el usuario.');
            }
          },
        },
      ],
    });
    await alert.present();
  }

  // Función de ayuda para mostrar alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Función para traducir errores de Firebase
  getErrorMessage(error: any): string {
    if (error.code === 'auth/email-already-in-use') {
      return 'El correo electrónico ya está registrado.';
    }
    if (error.code === 'auth/invalid-email') {
      return 'El formato del correo electrónico no es válido.';
    }
    if (error.code === 'auth/weak-password') {
      return 'La contraseña es muy débil. Debe tener al menos 6 caracteres.';
    }
    return 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
  }
}