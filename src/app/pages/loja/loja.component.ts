import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../../componentes/product-list/product-list.component';
import { PaginationComponent } from '../../componentes/pagination/pagination.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Produto } from '../../services/product.service';

@Component({
  selector: 'app-loja',
  standalone: true,
  imports: [CommonModule, ProductListComponent, PaginationComponent],
  templateUrl: './loja.component.html',
  styleUrl: './loja.component.css'
})
export class LojaComponent implements OnInit {
  
  products: Produto[] = [];
  loading: boolean = true;

  currentPage: number = 1;
  totalPages: number = 0;
  itemsPerPage: number = 8;

  termoBusca: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Quando a rota muda, recarrega (search ou página)
    this.route.queryParams.subscribe(params => {
      this.termoBusca = params['search'] || null;
      this.currentPage = Number(params['page']) || 1;

      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.loading = true;

    // 🔎 Se existir busca, carrega a busca
    if (this.termoBusca && this.termoBusca.trim() !== '') {
      this.productService.buscarProdutos(this.termoBusca, this.currentPage, this.itemsPerPage)
        .subscribe({
          next: (response) => {
            const totalCount = Number(response.headers.get('X-Total-Count'));
            this.totalPages = Math.ceil(totalCount / this.itemsPerPage);

            this.products = response.body || [];
            this.loading = false;
          },
          error: () => {
            this.toastr.error("Erro ao buscar produtos.");
            this.loading = false;
          }
        });

      return;
    }

    // 🛍️ Caso contrário, lista normal
    this.productService.getProdutosPaginados(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (response) => {
          const totalCount = Number(response.headers.get('X-Total-Count'));
          this.totalPages = Math.ceil(totalCount / this.itemsPerPage);

          this.products = response.body || [];
          this.loading = false;
        },
        error: () => {
          this.toastr.error('Erro ao carregar os produtos.');
          this.loading = false;
        }
      });
  }

  // 🔄 Quando muda de página
  onPageChange(page: number): void {
    this.router.navigate([], {
      queryParams: {
        page: page,
        search: this.termoBusca || null
      }
    });
  }
}
