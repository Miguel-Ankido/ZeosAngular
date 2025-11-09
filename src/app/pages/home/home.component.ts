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
    { id: "1", name: 'Camisa Chico Moedas Preto', price: '149,90', image: 'assets/images/camisa-chico.png', rating: 5, oldPrice: null },
    { id: "2", name: 'Camisa Eos', price: '160,00', image: 'assets/images/camisa-eos.png', rating: 5, oldPrice: null },
    { id: "3", name: 'Camisa BrBrr Brr Patapim', price: '189,00', image: 'assets/images/camisa-patapim.png', rating: 3.5, oldPrice: null },
    { id: "4", name: 'Camisa Educação Física...', price: '140,00', image: 'assets/images/camisa-ed-fisica.png', rating: 4.5, oldPrice: null },
    { id: "5", name: 'Camisa Eu Faço Programa', price: '197,99', image: 'assets/images/camisa-programa.png', rating: 5, oldPrice: null },
    { id: "6", name: 'Camiseta Zeos', price: '169,00', image: 'assets/images/cavalo-removebg-preview.png', rating: 5, oldPrice: null },
    { id: "7", name: 'Camisa Tropa da Fidelidade', price: '197,99', image: 'assets/images/camisa-fidelidade.png', rating: 4, oldPrice: null },
    { id: "8", name: 'Camisa Do R10', price: '94,00', image: 'assets/images/camisa-r10.png', rating: 4, oldPrice: null },
  ];

  novidadesData = [
    { id: "9", name: 'Camisa Eos', oldPrice: '239,99', price: '160,00', image: 'assets/images/camisa-eos.png', rating: 4.5 },
    { id: "10", name: 'Camiseta Zeos', oldPrice: '239,99', price: '189,00', image: 'assets/images/cavalo-removebg-preview.png', rating: 5 },
    { id: "11", name: 'Camiseta Treina Fofo', oldPrice: '239,99', price: '169,00', image: 'assets/images/camisa-treina-fofo.png', rating: 4.5 },
    { id: "12", name: 'Camiseta Ñ Queria Ter Vindo', oldPrice: '239,99', price: '189,00', image: 'assets/images/camisa-nao-queria.png', rating: 5 },
  ];
  // Fim dos dados mocados
}