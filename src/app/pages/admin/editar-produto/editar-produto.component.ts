import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core'; // <--- O PLATFORM_ID DEVE ESTAR AQUI
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import { ProductService, Produto } from '../../../services/product.service'; // Verifique se este caminho está certo para você
import { RouterModule } from '@angular/router';
    
@Component({
  selector: 'app-editar-produto',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule, RouterModule], 
  templateUrl: './editar-produto.component.html',
  styleUrl: './editar-produto.component.css'
})
export class EditarProdutoComponent implements OnInit {
    
  faPlus = faPlus;
  produtos: Produto[] = []; 
  produtoSelecionado: Produto | null = null;
    
  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object // <--- O ERRO GERALMENTE VEM DAQUI SE O IMPORT FALTAR
  ) {}
    
  ngOnInit(): void {
    this.carregarProdutos();
  }
    
  carregarProdutos(): void {
    this.productService.getProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos', err);
      }
    });
  }
    
  onProdutoSelecionado(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const produtoId = target.value;
    
    if (produtoId) {
      const produtoEncontrado = this.produtos.find(p => p.id === produtoId);
      this.produtoSelecionado = produtoEncontrado ? { ...produtoEncontrado } : null;
    } else {
      this.produtoSelecionado = null;
    }
  }

  salvarEdicoes(): void {
    if (!this.produtoSelecionado) return;

    this.productService.updateProduto(this.produtoSelecionado.id, this.produtoSelecionado).subscribe({
      next: () => {
        if (isPlatformBrowser(this.platformId)) {
          this.toastr.success('Produto atualizado com sucesso!');
          const select = document.getElementById('produto-select') as HTMLSelectElement;
          if(select) select.value = "";
        }
        this.carregarProdutos();
        this.produtoSelecionado = null;
      },
      error: (err) => {
        if (isPlatformBrowser(this.platformId)) {
          this.toastr.error('Erro ao atualizar o produto.');
        }
        console.error(err);
      }
    });
  }

  excluirProduto(): void {
    if (!this.produtoSelecionado) return;

    if (isPlatformBrowser(this.platformId)) {
      if (!confirm(`Tem certeza que deseja excluir o produto "${this.produtoSelecionado.name}"?`)) {
        return;
      }
    } else {
      return; 
    }

    this.productService.deleteProduto(this.produtoSelecionado.id).subscribe({
      next: () => {
        if (isPlatformBrowser(this.platformId)) {
          this.toastr.success('Produto excluído com sucesso!');
          const select = document.getElementById('produto-select') as HTMLSelectElement;
          if(select) select.value = "";
        }
        this.carregarProdutos();
        this.produtoSelecionado = null;
      },
      error: (err) => {
        if (isPlatformBrowser(this.platformId)) {
          this.toastr.error('Erro ao excluir o produto.');
        }
        console.error(err);
      }
    });
  }
}