import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf
import { CartService, CartItem as CartItemData } from '../../services/cart.service'; // 1. Importa o CartService

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule], // 2. Adiciona CommonModule
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  // 3. Recebe o 'item' da página do Carrinho
  @Input() item!: CartItemData; // O '!' diz ao TS que o 'pai' vai fornecer

  // 4. Injeta o CartService
  constructor(private cartService: CartService) {}

  // 5. Funções que chamam o "cérebro"
  handleIncrease() {
    this.cartService.addToCart(this.item, 1); // Adiciona 1
  }
  
  handleDecrease() {
    this.cartService.decrementItem(this.item.id); // Remove 1
  }

  handleRemove() {
    this.cartService.removeFromCart(this.item.id); // Remove todos
  }
}