import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // 1. Importe o RouterLink
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  // 2. Adicione RouterLink aqui
  imports: [CommonModule, StarRatingComponent, RouterLink], 
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  // 3. @Input() permite que o componente "receba" estas propriedades
  //    (Isto estava faltando, o que causava 8 dos 10 erros)
  @Input() id: string = '';
  @Input() image: string = '';
  @Input() name: string = '';
  @Input() oldPrice: string | null = null;
  @Input() price: string = ''; // 4. Corrigido de @InputV para @Input
  @Input() rating: number = 0;
}