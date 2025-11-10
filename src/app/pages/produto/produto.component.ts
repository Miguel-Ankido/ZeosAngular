import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core'; // 1. Importe PLATFORM_ID e Inject
import { isPlatformBrowser, CommonModule } from '@angular/common'; // 2. Importe isPlatformBrowser e CommonModule
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute, RouterLink } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; 

// 3. CORREÇÃO DA IMPORTAÇÃO (Caminho e Nome)
import { ProductService, Produto } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

// 4. CORREÇÃO DA IMPORTAÇÃO (Caminho e Nome)
import { StarRatingComponent } from '../../componentes/star-rating/star-rating.component';

@Component({
  selector: 'app-produto',
  standalone: true,
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
  
  product: Produto | null = null;
  reviews: any[] = [];
  loading: boolean = true;
  quantity: number = 1;
  reviewRating: number = 0;
  reviewName: string = '';
  reviewEmail: string = '';

  private platformId: Object; // 5. Variável para guardar o platformId

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) platformId: Object // 6. "Injeta" o PLATFORM_ID
  ) {
    this.platformId = platformId; // 7. Armazena o platformId
  }

  ngOnInit(): void {
    // 8. PROTEÇÃO DO 'window' (Só roda no navegador)
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0); // Rola para o topo
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.toastr.error('Produto não encontrado.');
      this.loading = false;
      return;
    }

    this.productService.getProdutoById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
        this.loadUserData(); // Carrega os dados do usuário (se houver)
      },
      error: (err) => {
        console.error("Erro ao carregar produto:", err);
        this.toastr.error('Erro ao carregar o produto.');
        this.loading = false;
      }
    });

    this.fetchProductReviews(id);
  }

  loadUserData() {
    // 9. PROTEÇÃO DO 'localStorage' (Só roda no navegador)
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user && this.product) {
        const parsedUser = JSON.parse(user);
        this.reviewEmail = parsedUser.email;
        this.reviewName = parsedUser.nomeCompleto;
      }
    }
  }

  fetchProductReviews(id: string) {
    this.productService.getReviewsByProductId(id).subscribe({
      next: (data) => {
        this.reviews = data;
      },
      error: (err) => {
        console.error("Erro ao carregar avaliações:", err);
        this.toastr.error("Erro ao carregar avaliações.");
      }
    });
  }

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
        this.reviewRating = 0;
        form.resetForm(); 
        this.loadUserData(); 
      },
      error: (err) => {
        console.error("Erro ao enviar avaliação:", err);
        this.toastr.error('Erro ao enviar avaliação.');
      }
    });
  }

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