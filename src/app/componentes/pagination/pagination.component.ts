import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngFor

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  // 1. RECEBE os dados da LojaPage
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;

  // 2. EMITE um evento (pageChange) quando o usuário clica
  @Output() pageChange = new EventEmitter<number>();

  // 3. Gera a lista de números de página
  get pages(): number[] {
    const pageArray = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pageArray.push(i);
    }
    return pageArray;
  }

  // 4. Funções de clique
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page); // Avisa a LojaPage para mudar
    }
  }

  goToPrev(): void {
    this.goToPage(this.currentPage - 1);
  }

  goToNext(): void {
    this.goToPage(this.currentPage + 1);
  }
}