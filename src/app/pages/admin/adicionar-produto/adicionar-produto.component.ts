import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Importa RouterModule
import { ToastrService } from 'ngx-toastr';
import { ProductService, Produto } from '../../../services/product.service';

@Component({
  selector: 'app-adicionar-produto',
  standalone: true,
  // Adiciona RouterModule e FormsModule
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './adicionar-produto.component.html',
  styleUrl: './adicionar-produto.component.css'
})
export class AdicionarProdutoComponent {

  faArrowLeft = faArrowLeft;
  
  // Objeto para vincular ao formulário.
  // Inicializa com valores padrão para evitar erros de 'undefined'
  novoProduto: Partial<Produto> = {
    name: '',
    oldPrice: null,
    price: '',
    image: '',
    rating: 0,
    estoque: 0,
    sku: '',
    categoria: '',
    descricao_curta: '',
    descricao_longa: '',
    material: ''
  };

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  adicionarProduto(form: NgForm): void {
    if (form.invalid) {
      if (isPlatformBrowser(this.platformId)) {
        this.toastr.warning('Por favor, preencha todos os campos obrigatórios.');
      }
      return;
    }

    
    const produtoParaSalvar = this.novoProduto as Produto;

    this.productService.createProduto(produtoParaSalvar).subscribe({
      next: () => {
        if (isPlatformBrowser(this.platformId)) {
          this.toastr.success('Produto adicionado com sucesso!');
        }
        
        this.router.navigate(['/admin/editar_produto']);
      },
      error: (err) => {
        if (isPlatformBrowser(this.platformId)) {
          this.toastr.error('Erro ao adicionar o produto.');
        }
        console.error(err);
      }
    });
  }
}