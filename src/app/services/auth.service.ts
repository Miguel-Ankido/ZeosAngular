import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model'; // (Confirme que você criou 'src/app/models/user.model.ts')

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // !! IMPORTANTE !! Cole a URL da sua API do Render aqui
  private API_URL = 'https://api-1-6p1t.onrender.com';

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  private platformId: Object;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;
    let user = null;
    // Protege a leitura do localStorage
    if (isPlatformBrowser(this.platformId)) {
      const localUser = localStorage.getItem('user');
      user = localUser ? JSON.parse(localUser) : null;
    }
    this.currentUserSubject = new BehaviorSubject<User | null>(user);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // "getter" para checagem síncrona
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Tenta fazer o Login
   */
  login(email: string, password: string): Observable<any> {
    return this.http.get<User[]>(`${this.API_URL}/users?email=${email}&password=${password}`).pipe(
      tap(users => {
        if (users.length > 0) {
          const user = users[0];
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('user', JSON.stringify(user));
          }
          this.currentUserSubject.next(user);
          this.toastr.success('Login bem-sucedido!');
          this.router.navigate(['/']); 
        } else {
          this.toastr.error('E-mail ou senha incorretos.');
        }
      }),
      catchError(err => {
        this.toastr.error('Ocorreu um erro ao tentar logar.');
        console.error(err);
        throw err;
      })
    );
  }

  /**
   * Tenta Registrar um novo usuário
   * (A FUNÇÃO QUE ESTAVA FALTANDO)
   */
  register(userData: any): Observable<User | null> {
    // 1. Verifica se o e-mail já existe
    return this.http.get<User[]>(`${this.API_URL}/users?email=${userData.email}`).pipe(
      switchMap(existingUsers => {
        if (existingUsers.length > 0) {
          // Se o e-mail já existe
          this.toastr.warning('Este e-mail já está cadastrado.');
          return of(null); // Retorna nulo para o componente
        } else {
          // 2. Se não existe, cria o novo usuário (POST)
          return this.http.post<User>(`${this.API_URL}/users`, userData);
        }
      }),
      catchError(err => {
        this.toastr.error('Ocorreu um erro ao tentar cadastrar.');
        console.error(err);
        throw err;
      })
    );
  }

  /**
   * Faz o Logout
   */
  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
    this.currentUserSubject.next(null);
    this.toastr.success('Você saiu da sua conta.');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  isAdmin(): boolean {
    return !!this.currentUserValue?.isAdmin;
  }
}