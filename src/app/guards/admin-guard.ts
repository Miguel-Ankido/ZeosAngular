
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (authService.isAdmin()) {
    return true; 
  } else {
   
    toastr.error('Acesso negado. Você não é um administrador.');
    router.navigate(['/']); 
    return false; 
  }
};