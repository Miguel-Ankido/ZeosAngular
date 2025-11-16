import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // JÁ ESTAVA
import { User } from '../../models/user.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserCircle, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  usuario: User | null = null; 
  faUserCircle = faUserCircle;
  faCreditCard = faCreditCard;
  exibirFormularioCartao: boolean = false;
  novoCartao = {
    numero: '',
    nome: '',
    validade: ''
  };

  // O constructor já deve ter o AuthService
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Escuta as atualizações do utilizador (para ver o novo cartão)
    this.authService.currentUser$.subscribe(user => {
      this.usuario = user;
    });
  }

  fazerLogout(): void {
    this.authService.logout();
  }

  mostrarFormularioCartao(): void {
    this.exibirFormularioCartao = true;
  }

  ocultarFormularioCartao(): void {
    this.exibirFormularioCartao = false;
    this.novoCartao = { numero: '', nome: '', validade: '' };
  }

  // --- FUNÇÃO DE GUARDAR ATUALIZADA ---
  salvarCartao(): void {
    // Chama o serviço para guardar o cartão na API e no estado
    this.authService.adicionarCartao(this.novoCartao).subscribe({
      next: () => {
        // Se for bem-sucedido, esconde o formulário
        this.ocultarFormularioCartao();
      },
      error: (err) => {
        console.error('Falha ao guardar o cartão', err);
      }
    });
  }
}