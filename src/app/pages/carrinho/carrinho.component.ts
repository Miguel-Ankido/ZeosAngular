import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor, AsyncPipe
import { RouterLink } from '@angular/router'; // Para os botões/links
import { Observable } from 'rxjs'; // Para "ouvir" o carrinho
import { CartService, CartItem } from '../../services/cart.service'; // 1. Importa o CartService
import { CartItemComponent } from '../../componentes/cart-item/cart-item.component'; // 2. Importa o CartItem

@Component({
  selector: 'app-carrinho',
  standalone: true,
  // 3. Adiciona os imports
  imports: [CommonModule, RouterLink, CartItemComponent],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {
  
  // 4. "Assina" a lista de itens do "cérebro"
  cartItems$: Observable<CartItem[]>;
  subtotal: number = 0;

  // 5. Simulação do frete (baseado no aviso da imagem)
  freteGratisMinimo = 400;
  faltaParaFrete = 400;

  // 6. Injeta o CartService
  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cartItems$; // Pega a lista "ao vivo"
    
    // Assina as mudanças para recalcular o total
    this.cartItems$.subscribe(() => {
      this.subtotal = this.cartService.getSubtotal();
      this.faltaParaFrete = this.freteGratisMinimo - this.subtotal;
    });
  }
}