import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    FormsModule 
  ],
  templateUrl: './cabecalho.html', // Verifique se o nome é .html ou .component.html no seu arquivo real
  styleUrl: './cabecalho.css'
})
export class CabecalhoComponent {
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  faSignOutAlt = faSignOutAlt;

  currentUser$: Observable<User | null>;
  termoBusca: string = ''; 
  constructor(private authService: AuthService, private router: Router) {
    this.currentUser$ = this.authService.currentUser$;
  }

  logout(): void {
    this.authService.logout();
  }


  buscar(): void {
    if (this.termoBusca.trim()) {
     
      this.router.navigate(['/loja'], { queryParams: { search: this.termoBusca } });
      
    
      this.termoBusca = ''; 
    }
  }
}