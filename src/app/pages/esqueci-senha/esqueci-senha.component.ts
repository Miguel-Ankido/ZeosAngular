import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. Importe o RouterLink

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [RouterLink], // 2. Adicione aqui
  templateUrl: './esqueci-senha.component.html',
  styleUrl: './esqueci-senha.component.css'
})
export class EsqueciSenhaComponent {

}