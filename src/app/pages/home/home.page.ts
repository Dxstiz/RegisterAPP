import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../common/services/auth.service'; 
import { DataService } from 'src/app/data.service';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { UserI } from 'src/app/common/models/users.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {



  nombreUsuario: string = '';
  cards: any[] = [];
  rolUser: string = '';

  canDeactivate(): boolean {
    return confirm('¿Estás seguro de cerrar session?');
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private dataService: DataService,
    private firestoreService: FirestoreService,
    
  ) {
    this.userName();
    this.userRol();
   }

  ngOnInit() {
    this.loadCards();
  }

  

  datos() {
    console.log(this.nombreUsuario);
  }

  loadCards() {
    this.http.get<any[]>('assets/testing/cards.json').subscribe(data => {
      this.cards = data;
    });
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  async userName(){
    const uid = this.dataService.getUid();
    const userData = await this.firestoreService.getDocument<UserI>(`Usuarios/${uid}`);
    console.log('userData', userData?.userName);
    return this.nombreUsuario = userData?.userName || null;
  }

  async userRol(){
    const uid = this.dataService.getUid();
    const userData = await this.firestoreService.getDocument<UserI>(`Usuarios/${uid}`);
    console.log('userData', userData?.rol);
    return this.rolUser = userData?.rol || null;
  }

  async isAdmin(){
    if(this.rolUser == 'admin'){
      this.authService.setAdmin(true);
      this.router.navigate(['/lab']);
    }
  }

}
