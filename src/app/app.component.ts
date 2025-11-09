import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Importa o componente do cabeçalho
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // Adiciona o CabecalhoComponent aqui
  imports: [RouterOutlet, CabecalhoComponent], 
  
  // CORREÇÃO: Aponta para o nome de arquivo correto
  templateUrl: './app.component.html', 
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zeos-angular';
}