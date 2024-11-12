import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popover-content',
  templateUrl: './popover-content.component.html',
})
export class PopoverContentComponent {

  constructor(
    private popoverController: PopoverController,
    private authService: AuthService,
    private router: Router
  ) {}

  async logout() {
    await this.authService.logout();
    this.popoverController.dismiss();
    this.router.navigate(['/login']);
  }
}
