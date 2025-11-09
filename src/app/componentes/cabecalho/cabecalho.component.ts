import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// 1. Importe o Módulo e os Ícones
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  // 2. Adicione o FontAwesomeModule e o RouterLink aos imports
  imports: [FontAwesomeModule, RouterLink], 
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css' // (Já corrigido do Erro 1)
})
export class CabecalhoComponent {
  // 3. Exponha os ícones para o HTML
  faUser = faUser;
  faShoppingCart = faShoppingCart;
}