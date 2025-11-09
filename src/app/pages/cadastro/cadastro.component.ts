import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. Importe o RouterLink

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink], // 2. Adicione aqui
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

}