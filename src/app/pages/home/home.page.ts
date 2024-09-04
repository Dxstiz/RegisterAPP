import { Component } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombreUsuario: string = '';

  constructor(
    private dataService: DataService
  ) {
    this.nombreUsuario = this.dataService.getNombreUsuario();
  }

}
