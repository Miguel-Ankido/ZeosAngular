import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import { ProductService, Produto } from '../../../services/product.service';
    
@Component({
  selector: 'app-editar-produto',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule], 
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
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}
    
  ngOnInit(): void {
    // --- CORREÇÃO FINAL DO ERRO 500 ---
    // Só carrega os produtos se estiver no navegador.
    // Isso impede o SSR de fazer a chamada HTTP.
    if (isPlatformBrowser(this.platformId)) {
      this.carregarProdutos();
    }
  }
    
  carregarProdutos(): void {
    this.productService.getProdutos().subscribe(data => {
      this.produtos = data;
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
          (document.getElementById('produto-select') as HTMLSelectElement).value = "";
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
          (document.getElementById('produto-select') as HTMLSelectElement).value = "";
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