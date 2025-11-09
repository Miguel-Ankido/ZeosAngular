import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // 1. Importa o HttpClient
import { Observable } from 'rxjs'; // O "cérebro" reativo do Angular

// (Vamos definir a "forma" de um Produto, pego do seu db.json)
export interface Produto {
  id: string;
  name: string;
  oldPrice: string | null;
  price: string;
  image: string;
  rating: number;
  estoque: number;
  sku: string;
  categoria: string;
  descricao_curta: string;
  descricao_longa: string;
  material: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // 2. !! IMPORTANTE !! Cole a URL da sua API do Render aqui
  private API_URL = 'https://api-1-6p1t.onrender.com';

  // 3. "Injeta" o HttpClient no serviço
  constructor(private http: HttpClient) { }

  // 4. Função para buscar a lista de produtos (para a Home/Loja)
  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.API_URL}/produtos`);
  }

  // 5. Função para buscar UM produto pelo ID (para a Página do Produto)
  getProdutoById(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.API_URL}/produtos/${id}`);
  }

  // 6. Função para buscar as avaliações de um produto
  getReviewsByProductId(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/reviews?produtoId=${id}`);
  }

  // 7. Função para ENVIAR uma avaliação
  postReview(reviewData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/reviews`, reviewData);
  }
}