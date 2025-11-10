import { Injectable } from '@angular/core';
// 1. Importe o HttpResponse (necessário para a paginação)
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

// (A sua interface 'Produto' está perfeita)
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
  private API_URL = 'https://api-1-6p1t.onrender.com';

  constructor(private http: HttpClient) { }

  // Função para buscar TODOS os produtos (para a Home)
  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.API_URL}/produtos`);
  }

  // --- A FUNÇÃO QUE ESTAVA FALTANDO ---
  // 2. Função para a Página da Loja (com paginação)
  getProdutosPaginados(page: number, limit: number): Observable<HttpResponse<Produto[]>> {
    return this.http.get<Produto[]>(
      `${this.API_URL}/produtos?_page=${page}&_limit=${limit}`,
      { observe: 'response' } // Pede ao Angular para ler os Headers (X-Total-Count)
    );
  }
  // --- FIM DA ADIÇÃO ---


  // Função para buscar UM produto pelo ID (para a Página do Produto)
  getProdutoById(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.API_URL}/produtos/${id}`);
  }

  // Função para buscar as avaliações de um produto
  getReviewsByProductId(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/reviews?produtoId=${id}`);
  }

  // Função para ENVIAR uma avaliação
  postReview(reviewData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/reviews`, reviewData);
  }
}