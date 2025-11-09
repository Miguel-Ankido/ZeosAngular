import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
// 1. Importe os componentes que vamos usar
import { ProductListComponent } from '../../componentes/product-list/product-list.component';
import { PaginationComponent } from '../../componentes/pagination/pagination.component';

@Component({
  selector: 'app-loja',
  standalone: true,
  // 2. Adicione os imports aqui
  imports: [CommonModule, ProductListComponent, PaginationComponent],
  templateUrl: './loja.component.html',
  styleUrl: './loja.component.css'
})
export class LojaComponent {
  
  // 3. DADOS MOCADOS (os mesmos da Home, mas podemos mudar depois)
  mockLojaData = [
    { id: "1", name: 'Camisa Chico Moedas Preto', price: '149,90', image: 'assets/images/camisa-chico.png', rating: 5, oldPrice: null },
    { id: "2", name: 'Camisa Eos', price: '160,00', image: 'assets/images/camisa-eos.png', rating: 5, oldPrice: null },
    { id: "3", name: 'Camisa BrBrr Brr Patapim', price: '189,00', image: 'assets/images/camisa-patapim.png', rating: 3.5, oldPrice: null },
    { id: "4", name: 'Camisa Educação Física...', price: '140,00', image: 'assets/images/camisa-ed-fisica.png', rating: 4.5, oldPrice: null },
    { id: "5", name: 'Camisa Eu Faço Programa', price: '197,99', image: 'assets/images/camisa-programa.png', rating: 5, oldPrice: null },
    { id: "6", name: 'Camiseta Zeos', price: '169,00', image: 'assets/images/cavalo-removebg-preview.png', rating: 5, oldPrice: null },
    { id: "7", name: 'Camisa Tropa da Fidelidade', price: '197,99', image: 'assets/images/camisa-fidelidade.png', rating: 4, oldPrice: null },
    { id: "8", name: 'Camisa Do R10', price: '94,00', image: 'assets/images/camisa-r10.png', rating: 4, oldPrice: null },
  ];
  // Fim dos dados mocados
}