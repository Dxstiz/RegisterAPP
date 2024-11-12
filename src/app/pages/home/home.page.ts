import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../common/services/auth.service'; 
import { IonicModule } from '@ionic/angular';
import { DataService } from 'src/app/data.service';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { UserI } from 'src/app/common/models/users.models';
import { PopoverController } from '@ionic/angular'; // Importa PopoverController
import { PopoverContentComponent  } from 'src/app/components/popover-content/popover-content.component'; // Importa el nuevo componente

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  nombreUsuario: string = '';
  cards: any[] = [];
  rolUser: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private dataService: DataService,
    private firestoreService: FirestoreService,
    private popoverController: PopoverController // Inyecta PopoverController
  ) {
    this.userName();
    this.userRol();
  }

  ngOnInit() {
    this.loadCards();
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

  async presentPopover(ev: Event) {
    const popover = await this.popoverController.create({
      component: PopoverContentComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
  }

  async userName() {
    const uid = this.dataService.getUid();
    const userData = await this.firestoreService.getDocument<UserI>(`Usuarios/${uid}`);
    return (this.nombreUsuario = userData?.userName || '');
  }

  async userRol() {
    const uid = this.dataService.getUid();
    const userData = await this.firestoreService.getDocument<UserI>(`Usuarios/${uid}`);
    return (this.rolUser = userData?.rol || '');
  }

  async isAdmin() {
    if (this.rolUser === 'admin') {
      this.authService.setAdmin(true);
      this.router.navigate(['/lab']);
    }
  }
}
