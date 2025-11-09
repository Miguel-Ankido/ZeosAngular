import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. Importa o CommonModule
import { ProductCardComponent } from '../product-card/product-card.component'; // 2. Importa o ProductCard

@Component({
  selector: 'app-product-list',
  standalone: true,
  // 3. Adiciona os imports aqui
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  // 4. @Input() permite que este componente receba "title" e "products"
  @Input() title: string = '';
  @Input() products: any[] = []; // (Usamos 'any[]' por agora)
}