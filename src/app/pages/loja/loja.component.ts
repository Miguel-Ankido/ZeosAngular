import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../../componentes/product-list/product-list.component';
import { PaginationComponent } from '../../componentes/pagination/pagination.component';
import { ToastrService } from 'ngx-toastr';

// 1. Importe o Serviço de Produtos
import { ProductService, Produto } from '../../services/product.service';

@Component({
  selector: 'app-loja',
  standalone: true,
  imports: [CommonModule, ProductListComponent, PaginationComponent],
  templateUrl: './loja.component.html',
  styleUrl: './loja.component.css'
})
export class LojaComponent implements OnInit {
  
  // 2. Estados para os dados
  products: Produto[] = [];
  loading: boolean = true;
  
  // 3. Estados para a Paginação
  currentPage: number = 1;
  totalPages: number = 0;
  itemsPerPage: number = 8; // Queremos 8 por página

  // 4. Injeta os Serviços
  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProducts(); // Carrega os produtos da primeira página
  }

  // 5. Função que busca os produtos da API
  loadProducts(): void {
    this.loading = true;
    this.productService.getProdutosPaginados(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (response) => {
          // 6. Pega o total do Header (X-Total-Count)
          const totalCount = Number(response.headers.get('X-Total-Count'));
          this.totalPages = Math.ceil(totalCount / this.itemsPerPage);
          
          // 7. Pega os produtos do 'body'
          this.products = response.body || [];
          this.loading = false;
        },
        error: (err) => {
          console.error("Erro ao buscar produtos:", err);
          this.toastr.error('Erro ao carregar os produtos.');
          this.loading = false;
        }
      });
  }

  // 8. Função que será chamada pelo componente Pagination
  onPageChange(page: number): void {
    this.currentPage = page; // Atualiza a página atual
    this.loadProducts();     // Busca os produtos da nova página
    window.scrollTo(0, 0);  // Rola para o topo
  }
}