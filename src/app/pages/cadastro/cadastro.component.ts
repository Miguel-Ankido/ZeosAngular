import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router'; // 1. Importe o Router (para redirecionar)
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // 2. Importe o "cérebro"
import { ToastrService } from 'ngx-toastr'; // 3. Importe o Toastr

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  
  // 4. Estados para o formulário (todos os campos)
  formData = {
    email: '',
    password: '',
    nomeCompleto: '',
    telefone: '',
    rua: '',
    numero: '',
    bairro: '',
    cep: '',
    cidade: '',
    isAdmin: false // Padrão
  };
  loading = false;

  // 5. Injeta os serviços
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  // 6. Função que o formulário vai chamar
  handleRegister() {
    if (this.loading) return;
    this.loading = true;

    // 7. Chama a função de registro do "cérebro"
    this.authService.register(this.formData).subscribe({
      next: (response) => {
        if (response) {
          // Se o 'response' não for nulo (ou seja, o usuário foi criado)
          this.toastr.success('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']); // Manda para o login
        }
        // (O AuthService já cuida do toast de "e-mail já existe")
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}