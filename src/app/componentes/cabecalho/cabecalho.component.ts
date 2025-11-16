import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Precisa disso para *ngIf
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Importe os 3 ícones

// Imports para o Login
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [
    CommonModule, 
    FontAwesomeModule, 
    RouterLink
  ], 
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css'
})
export class CabecalhoComponent {
  // Exponha os 3 ícones para o HTML
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  faSignOutAlt = faSignOutAlt; // Ícone de Sair

  // Variável para "escutar" o status do usuário
  currentUser$: Observable<User | null>;

  // Injete o serviço de autenticação
  constructor(private authService: AuthService) {
    // Conecte a variável local ao "cérebro" do serviço
    this.currentUser$ = this.authService.currentUser$;
  }

  // Método que o botão "Sair" vai chamar
  logout(): void {
    this.authService.logout();
  }
}