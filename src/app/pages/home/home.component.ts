import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. Importa o CommonModule
import { ProductListComponent } from '../../componentes/product-list/product-list.component'; // 2. Importa o ProductList

@Component({
  selector: 'app-home',
  standalone: true,
  // 3. Adiciona os imports aqui
  imports: [CommonModule, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // 4. DADOS MOCADOS (de mentira)
  // (Note que agora eles têm a propriedade 'rating')
  // (Copie as imagens para /src/assets/images/)
  nossosProdutosData = [
    { id: "1", name: 'Camisa Chico Moedas Preto', price: '149,90', image: 'https://github.com/Miguel-Ankido/zeos-assets/blob/main/Camisa-chico.png?raw=true', rating: 5, oldPrice: null },
    { id: "2", name: 'Camisa Eos', price: '160,00', image: 'https://github.com/Miguel-Ankido/zeos-assets/blob/main/camisa-eos.png?raw=true', rating: 5, oldPrice: null },
    { id: "3", name: 'Camisa BrBrr Brr Patapim', price: '189,00', image: 'https://raw.githubusercontent.com/Miguel-Ankido/zeos-assets/main/Camisa%20BrBrr%20Brr%20Patapim.png', rating: 3.5, oldPrice: null },
    { id: "4", name: 'Camisa Educação Física...', price: '140,00', image: 'https://github.com/Miguel-Ankido/zeos-assets/blob/main/Camisa%20Ed.Fisica.png?raw=true', rating: 4.5, oldPrice: null },
    { id: "5", name: 'Camisa Eu Faço Programa', price: '197,99', image: 'https://github.com/Miguel-Ankido/zeos-assets/blob/main/Camisa%20Eu%20Faco%20Programa.png?raw=true', rating: 5, oldPrice: null },
    { id: "6", name: 'Camiseta Zeos', price: '169,00', image: 'https://github.com/Miguel-Ankido/zeos-assets/blob/main/cavalo-removebg-preview.png?raw=true', rating: 5, oldPrice: null },
    { id: "7", name: 'Camisa Tropa da Fidelidade', price: '197,99', image: 'https://github.com/Miguel-Ankido/zeos-assets/blob/main/Camisa%20Tropa%20da%20Fidelidade.png?raw=true', rating: 4, oldPrice: null },
    { id: "8", name: 'Camisa Do R10', price: '94,00', image: 'https://github.com/Miguel-Ankido/zeos-assets/blob/main/Camisa%20Do%20R10.png?raw=true', rating: 4, oldPrice: null },
  ];

  novidadesData = [
    { id: "9", name: 'Camisa Eos', oldPrice: '239,99', price: '160,00', image: 'https://github.com/Miguel-Ankido/zeos-assets/blob/main/camisa-eos.png?raw=true', rating: 4.5 },
    { id: "10", name: 'Camiseta Zeos', oldPrice: '239,99', price: '189,00', image: 'https://github.com/Miguel-Ankido/zeos-assets/blob/main/cavalo-removebg-preview.png?raw=true', rating: 5 },
    { id: "11", name: 'Camiseta Treina Fofo', oldPrice: '239,99', price: '169,00', image: 'https://github.com/Miguel-Ankido/zeos-assets/blob/main/Camiseta%20Treina%20Fofo.png?raw=true', rating: 4.5 },
    { id: "12", name: 'Camiseta Ñ Queria Ter Vindo', oldPrice: '239,99', price: '189,00', image: 'https://github.com/Miguel-Ankido/zeos-assets/blob/main/Camiseta%20n%20Queria%20Ter%20Vindo.png?raw=true', rating: 5 },
  ];
  // Fim dos dados mocados
}