import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../data.service';
import { UserI } from 'src/app/common/models/users.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  nombreUsuario: string = '';
  cards: any[] = [];

  canDeactivate(): boolean {
    return confirm('¿Estás seguro de cerrar session?');
  }

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router,

  ) { }

  ngOnInit() {
    this.nombreUsuario = this.dataService.getNombreUsuario();
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


}
