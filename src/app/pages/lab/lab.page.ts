import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/common/models/users.models';
import { FirestoreService } from 'src/app/common/servicev2/firestore.service';
import { FormsModule } from '@angular/forms';
import { user } from '@angular/fire/auth';
import { AuthService } from 'src/app/common/servicev2/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lab',
  templateUrl: './lab.page.html',
  styleUrls: ['./lab.page.scss']
})
export class LabPage implements OnInit {

  users: UserI[] = [];
  password: string;
  newUser: UserI;
  cargando: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private router: Router
  ) { 
    this.loadusers();
    this.initUser();
    this.getUserName('YXtQ2aAlXfgTDq3ESVoCBSsnPwr2');
  }
  
  ngOnInit() {
  }

  loadusers() {
    this.firestoreService.getCollectionChanges<UserI>('Usuarios').subscribe(data => {
      if(data){
        this.users = data;
      }
    })
  }

  initUser(){
    this.newUser = {
      correo: null,
      userName: null,
      rol: null,
      id: this.firestoreService.createIdDoc(),
    }
  }


  async update(user: UserI) {
    this.firestoreService.updateDocument('Usuarios', user.id, this.newUser);
  }

  async save() {
    this.cargando = true;

    try {
      await this.authService.register(this.newUser.correo, this.password, this.newUser); // Llama a la función de registro
      // Aquí puedes agregar lógica para mostrar un mensaje de éxito o limpiar el formulario.
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      // Aquí puedes agregar lógica para manejar errores (ej. mostrar alertas)
    } finally {
      this.cargando = false;
      this.initUser(); // Reiniciar el formulario
      this.password = ''; // Limpiar el campo de contraseña
    }
  }


  edit(user: UserI){
    this.newUser = user;
  }

  async delete(user: UserI){
    this.cargando = true;
    await this.firestoreService.deleteDocumentID('Usuarios', user.id);
    this.cargando = false;
  }

  async getUserName(uid: string): Promise<string | null> {
    const userData = await this.firestoreService.getDocument<UserI>(`Usuarios/${uid}`);
    console.log('userData', userData?.userName);
    return userData?.userName || null;
  }

  goBack(){
    this.router.navigate(['/home']);
  }

}


