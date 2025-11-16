import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { LojaComponent } from './pages/loja/loja.component';
import { AjudaComponent } from './pages/ajuda/ajuda.component';
import { ErroComponent } from './pages/erro/erro.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { EsqueciSenhaComponent } from './pages/esqueci-senha/esqueci-senha.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { authGuard } from './guards/auth-guard';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'loja', component: LojaComponent },
  { path: 'ajuda', component: AjudaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'produto/:id', component: ProdutoComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [ authGuard ] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [ authGuard ] },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'esqueci-senha', component: EsqueciSenhaComponent },
  { path: '**', component: ErroComponent }
];