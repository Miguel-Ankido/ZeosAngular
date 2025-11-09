import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// 1. Importe o 'IconDefinition' para tipagem
import { IconDefinition, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegStar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();
  
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  faRegStar = faRegStar;
  
  hoverRating: number = 0;
  
  // 2. Getter para o MODO INTERATIVO (retorna [1,2,3,4,5])
  get interactiveStars(): number[] {
    return [1, 2, 3, 4, 5];
  }

  // 3. Getter para o MODO DISPLAY (retorna os ícones corretos)
  get displayStars(): IconDefinition[] {
    const starsArray: IconDefinition[] = [];
    
    // Se o rating for 0, retorna 5 estrelas vazias
    if (!this.rating || this.rating === 0) {
      for (let i = 0; i < 5; i++) starsArray.push(this.faRegStar);
      return starsArray;
    }
    
    // Se tiver rating, calcula
    for (let i = 1; i <= 5; i++) {
      if (i <= this.rating) {
        starsArray.push(this.faStar);
      } else if (i === Math.ceil(this.rating) && !Number.isInteger(this.rating)) {
        starsArray.push(this.faStarHalfAlt);
      } else {
        starsArray.push(this.faRegStar);
      }
    }
    return starsArray;
  }

  // 4. Funções de clique/hover (para o modo interativo)
  setRating(value: number) {
    this.ratingChange.emit(value); // Envia o número (ex: 3)
  }
  setHover(value: number) {
    this.hoverRating = value;
  }
  resetHover() {
    this.hoverRating = 0;
  }
}