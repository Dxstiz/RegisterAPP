import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { PopoverController } from '@ionic/angular'; // Importa PopoverController
import { PopoverContentComponent  } from 'src/app/components/popover-content/popover-content.component'; // Importa el nuevo componente
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from 'src/app/common/service/auth.service';
import { ClassService } from 'src/app/common/service/classes.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public user: any;
  public classes: any[] = [];
  qrCodeUrl: string | undefined;
  selectedClass: any;
  isModalOpen = false;
  cards: any[] = [];
  image: string | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private popoverController: PopoverController,
    private classService: ClassService,
  ) {

  }

  ngOnInit() {
    this.getUserData();
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

  getUserData(): void {
    const userData = this.authService.getUserData();
    this.user = userData;
    console.log(this.user);
  }

  async presentPopover(ev: Event) {
    const popover = await this.popoverController.create({
      component: PopoverContentComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
  }

  getClasses(): void {
    this.classService.getClasses('classes').subscribe((data) => {
      const classes = data.classes;
      console.log(classes);
      const filteredClasses = classes.filter(
        (c: any) => c.teacher_id === this.user.id
      );
      this.classes = filteredClasses;
    });
  }

  generateQR(classId: string): void {
    const data = {
      class_id: classId,
    };
    this.classService.generateQRCode(data).subscribe((response) => {
      this.qrCodeUrl = response.url; // Obtén la URL del QR desde la respuesta
      console.log(this.qrCodeUrl);
      this.selectedClass = this.classes.find((cls: any) => cls.id === classId); // Guarda la clase seleccionada
      this.isModalOpen = true; // Abre el modal
    });
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  closeModal(): void {
    this.isModalOpen = false; // Cierra el modal
    this.qrCodeUrl = ''; // Limpia la URL al cerrar
  }

  goClass() {
    this.router.navigate(['/clas-profe']);
  }

  async tomarFoto() {
    const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Camera
    });
    this.image = image.dataUrl;
  }

}
