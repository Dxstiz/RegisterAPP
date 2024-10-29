import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/common/models/users.models';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { FormsModule } from '@angular/forms';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.page.html',
  styleUrls: ['./lab.page.scss']
})
export class LabPage implements OnInit {

  users: UserI[] = [];

  newUser: UserI;
  cargando: boolean = false;

  constructor(
    private firestoreService: FirestoreService
  ) { 
    this.loadusers();
    this.initUser();
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
      nombre: null,
      edad: null,
      id: this.firestoreService.createIdDoc(),
    }
  }

  async save(){
    this.cargando = true;
    await this.firestoreService.createDocumentID(this.newUser, 'Usuarios', this.newUser.id)
    this.cargando = false;
    this.initUser();
  }

  edit(user: UserI){
    this.newUser = user;
  }

  async delete(user: UserI){
    this.cargando = true;
    await this.firestoreService.deleteDocumentID('Usuarios', user.id);
    this.cargando = false;
  }
}
