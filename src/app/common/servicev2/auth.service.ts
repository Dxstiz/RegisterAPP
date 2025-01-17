import { Injectable, inject } from '@angular/core';
import { Auth, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { authState } from 'rxfire/auth';
import { Observable } from 'rxjs';
import { UserI } from '../models/users.models';
import { FirestoreService } from 'src/app/common/servicev2/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rol = false; // Variable para controlar el rol del usuario
  isLogin = false; // Variable para controlar el estado de la autenticación
  private firestoreService: FirestoreService = inject(FirestoreService); // Inyección del servicio de Firestore
  private auth: Auth = inject(Auth); // Inyección del servicio de Auth
  user$: Observable<User | null>;    // Observable para el estado del usuario

  constructor() {
    this.user$ = authState(this.auth); // Monitorea el estado del usuario autenticado
    
  }

  setAdmin(status: boolean) {
    this.rol = status;
  }

  // Método para cambiar el estado de la autenticación
  setLogin(status: boolean) {
    this.isLogin = status;
  }

  // Registro de usuario con email y contraseña y guardar en Firestore
  async register(email: string, password: string, userData: UserI): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = userCredential.user.uid;

    // Guardar datos del usuario en Firestore
    userData.id = uid; // Asigna el UID al objeto UserI
    await this.firestoreService.createDocumentID(userData, 'Usuarios', uid); // Guardar el documento en Firestore
    
    return userCredential;
  }

  // Inicio de sesión con email y contraseña
  async login(email: string, password: string): Promise<UserCredential> {
    this.isLogin = true;
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Cierre de sesión
  async logout(): Promise<void> {
    this.isLogin = false;
    this.rol = false;
    return signOut(this.auth);
  }

  // Obtención del estado del usuario actual
  getUserState(): Observable<User | null> {
    return this.user$;
  }
}