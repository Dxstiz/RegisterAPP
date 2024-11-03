import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Importa el servicio que gestiona isLogin

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyecta el servicio de autenticación
  const router = inject(Router); // Inyecta el servicio de Router
 


  if (authService.isLogin) {
    return true;
  } else {
    router.navigate(['/welcome']); // Redirige a la página de bienvenida si isLogin es false
    return false; // No permite la navegación si isLogin es false
  }
};