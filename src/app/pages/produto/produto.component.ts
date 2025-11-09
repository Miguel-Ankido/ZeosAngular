import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor
import { FormsModule } from '@angular/forms'; // Para o formulário de avaliação
import { ActivatedRoute } from '@angular/router'; // Para ler o ID da URL
import { ToastrService } from 'ngx-toastr'; // Para os toasts
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Para ícones (se precisar)

// 1. Importe nossos "Cérebros"
import { ProductService, Produto } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

// 2. Importe os componentes reutilizáveis
import { StarRatingComponent } from '../../componentes/star-rating/star-rating.component';

@Component({
  selector: 'app-produto',
  standalone: true,
  // 3. Imports necessários
  imports: [
    CommonModule, 
    FormsModule, 
    StarRatingComponent, 
    FontAwesomeModule
  ],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css'
})
export class ProdutoComponent implements OnInit {
  
  // 4. Estados
  product: Produto | null = null;
  reviews: any[] = [];
  loading: boolean = true;
  quantity: number = 1;

  // 5. Estados do formulário de avaliação
  reviewRating: number = 0;
  reviewName: string = '';
  reviewEmail: string = '';

  // 6. Injeção de Dependência (O "cérebro" do Angular)
  constructor(
    private route: ActivatedRoute, // Para ler a URL
    private productService: ProductService, // Para buscar produtos
    private cartService: CartService, // Para o carrinho
    private toastr: ToastrService // Para os toasts
  ) {}

  // 7. ngOnInit é o 'useEffect' do Angular que roda 1 vez
  ngOnInit(): void {
    window.scrollTo(0, 0); // Rola para o topo

    // Pega o ID da URL
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.toastr.error('Produto não encontrado.');
      this.loading = false;
      return;
    }

    // Busca os dados do produto
    this.productService.getProdutoById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
        // Pega o e-mail do usuário logado (se houver)
        this.loadUserData();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao carregar o produto.');
        this.loading = false;
      }
    });

    // Busca as avaliações
    this.fetchProductReviews(id);
  }

  loadUserData() {
    const user = localStorage.getItem('user');
    if (user && this.product) {
      this.reviewEmail = JSON.parse(user).email;
      this.reviewName = JSON.parse(user).nomeCompleto;
    }
  }

  fetchProductReviews(id: string) {
    this.productService.getReviewsByProductId(id).subscribe(data => {
      this.reviews = data;
    });
  }

  // 8. Funções de Ação
  handleAddToCart() {
    if (!this.product) return;
    this.cartService.addToCart(this.product, this.quantity);
    this.toastr.success(`${this.quantity} "${this.product.name}" adicionado(s) ao carrinho!`);
  }

  handleSubmitReview(form: any) {
    if (this.reviewRating === 0) {
      this.toastr.warning('Por favor, selecione uma avaliação (estrelas).');
      return;
    }

    const newReview = {
      produtoId: this.product?.id,
      nome: this.reviewName,
      email: this.reviewEmail,
      rating: this.reviewRating
    };

    this.productService.postReview(newReview).subscribe({
      next: () => {
        this.toastr.success('Avaliação enviada com sucesso!');
        if (this.product) this.fetchProductReviews(this.product.id);
        // Limpa o formulário
        this.reviewRating = 0;
        form.resetForm(); // Reseta o formulário
        this.loadUserData(); // Recoloca os dados do usuário
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Erro ao enviar avaliação.');
      }
    });
  }

  // Funções do Seletor de Quantidade
  increaseQty() {
    if (this.product?.estoque && this.quantity < this.product.estoque) {
      this.quantity++;
    } else if (!this.product?.estoque) {
      this.quantity++;
    }
  }
  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }
}