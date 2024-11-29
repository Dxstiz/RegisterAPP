import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular'; // Importa PopoverController
import { PopoverContentComponent  } from 'src/app/components/popover-content/popover-content.component'; // Importa el nuevo componente
import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { FirestoreService } from 'src/app/common/services/firestore.service';
import { UserI } from 'src/app/common/models/users.models';

@Component({
  selector: 'app-clas-profe',
  templateUrl: './clas-profe.page.html',
  styleUrls: ['./clas-profe.page.scss'],
})
export class ClasProfePage implements OnInit {

  nombreUsuario: string = '';

  constructor(
    private popoverController: PopoverController,
    private authService: AuthService,
    private router: Router,
    private dataService: DataService,
    private firestoreService: FirestoreService,
  ) { 
    this.userName();
  }

  ngOnInit() {
    
  }

  async presentPopover(ev: Event) {
    const popover = await this.popoverController.create({
      component: PopoverContentComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  async userName() {
    const uid = this.dataService.getUid();
    const userData = await this.firestoreService.getDocument<UserI>(`Usuarios/${uid}`);
    return (this.nombreUsuario = userData?.userName || '');
  }


}
