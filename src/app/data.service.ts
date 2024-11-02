import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private nombreUsuario: string = '';
  private uidUser: string = '';

  setNombreUsuario(nombre: string) {
    this.nombreUsuario = nombre;
  }

  getNombreUsuario(): string {
    return this.nombreUsuario;
  }

  getUid(): string {
    return this.uidUser;
  }

  setUid(uid: string) {
    this.uidUser = uid;
  }
}