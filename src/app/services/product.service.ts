import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.API_URL}/produtos`);
  }

  getProdutosPaginados(page: number, limit: number): Observable<HttpResponse<Produto[]>> {
    return this.http.get<Produto[]>(
      `${this.API_URL}/produtos?_page=${page}&_limit=${limit}`,
      { observe: 'response' }
    );
  }

  getProdutoById(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.API_URL}/produtos/${id}`);
  }

  getReviewsByProductId(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/reviews?produtoId=${id}`);
  }

  postReview(reviewData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/reviews`, reviewData);
  }

  updateProduto(id: string, produtoData: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.API_URL}/produtos/${id}`, produtoData);
  }

  deleteProduto(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/produtos/${id}`);
  }
}