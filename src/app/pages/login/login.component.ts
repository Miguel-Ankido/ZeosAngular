import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 1. Importa o FormsModule (para o ngModel)
import { CommonModule } from '@angular/common'; // 2. Importa o CommonModule (para o [disabled])
import { AuthService } from '../../services/auth.service'; // 3. Importe o "cérebro"

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule], // 4. Adiciona FormsModule e CommonModule
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // 5. Estados para o formulário
  email = '';
  password = '';
  loading = false;

  // 6. "Injeta" o AuthService
  constructor(private authService: AuthService) {}

  // 7. Função que o formulário vai chamar
  handleLogin() {
    if (this.loading) return;
    this.loading = true;
    
    // 8. Chama a função de login do "cérebro"
    this.authService.login(this.email, this.password).subscribe({
      // (O AuthService já cuida do toast e do redirecionamento)
      error: () => this.loading = false, // Em caso de erro, reativa o botão
      complete: () => this.loading = false // Quando completar, reativa o botão
    });
  }
}