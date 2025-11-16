import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCreditCard, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';

// 1. IMPORTE O TOASTRSERVICE
import { ToastrService } from 'ngx-toastr'; 

import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FontAwesomeModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  usuario: User | null = null;
  totalDoCarrinho: number = 0;
  faCreditCard = faCreditCard;
  faBarcode = faBarcode;
  metodoPagamentoSelecionado: 'pix' | number = 'pix'; 

  constructor(
    private authService: AuthService,
    private cartService: CartService, 
    private router: Router,
    // 2. INJETE O TOASTRSERVICE NO CONSTRUTOR
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.usuario = user;
    });

    // this.totalDoCarrinho = this.cartService.getTotal(); 
    if (this.totalDoCarrinho === 0) {
       this.totalDoCarrinho = 159.90; // Exemplo
    }
  }

  selecionarPagamento(metodo: 'pix' | number): void {
    this.metodoPagamentoSelecionado = metodo;
  }

  finalizarCompra(): void {
    console.log("Pedido finalizado!");
    console.log("Método de Pagamento (ID):", this.metodoPagamentoSelecionado);

    // !! AQUI: Adicione a lógica real para salvar o pedido !!

    // 1. Limpa o carrinho (ex: this.cartService.limparCarrinho();)
    
    // 2. MOSTRA O TOAST DE SUCESSO (EM VEZ DO ALERT)
    this.toastr.success('Compra finalizada com sucesso!');

    // 3. Redireciona para a Home (ou página de "Obrigado")
    this.router.navigate(['/']);
  }
}