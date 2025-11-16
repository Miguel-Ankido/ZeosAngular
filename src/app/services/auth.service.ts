import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
    
    if (isPlatformBrowser(this.platformId)) {
      const localUser = localStorage.getItem('user');
      user = localUser ? JSON.parse(localUser) : null;
    }
    this.currentUserSubject = new BehaviorSubject<User | null>(user);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // --- FUNÇÕES DE LOGIN/REGISTO (Sem alteração) ---
  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.API_URL}/users?email=${email}&password=${password}`).pipe(
      tap(users => {
        if (users.length > 0) {
          const user: any = users[0]; 
          delete user.password; 
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

  register(userData: any): Observable<User | null> {
    // ... (O seu código de registo continua aqui, sem alteração)
    return this.http.get<User[]>(`${this.API_URL}/users?email=${userData.email}`).pipe(
      switchMap(existingUsers => {
        if (existingUsers.length > 0) {
          this.toastr.warning('Este e-mail já está cadastrado.');
          return of(null); 
        } else {
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

  // --- NOVA FUNÇÃO PARA GUARDAR O CARTÃO ---
 adicionarCartao(novoCartao: any): Observable<any> {
    const user = this.currentUserValue;
    if (!user) {
      this.toastr.error('Utilizador não encontrado.');
      return of(null);
    }

    // Garante que a lista de cartões existe
    if (!user.cartoes) { // <-- CORRIGIDO (era 'cards')
      user.cartoes = [];  // <-- CORRIGIDO (era 'cards')
    }

    // Adiciona o novo cartão à lista
    const cartaoComId = { ...novoCartao, id: Date.now() }; 
    user.cartoes.push(cartaoComId); // <-- CORRIGIDO (era 'cards')

    // Faz o PATCH na API (json-server)
    return this.http.patch(`${this.API_URL}/users/${user.id}`, { cartoes: user.cartoes }).pipe( // <-- CORRIGIDO (era 'cards')
      tap(() => {
        // Atualiza o localStorage e o BehaviorSubject
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
        this.toastr.success('Cartão adicionado com sucesso!');
      }),
      catchError(err => {
        this.toastr.error('Erro ao guardar o cartão.');
        console.error(err);
        throw err;
      })
    );
  }
}