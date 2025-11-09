import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  estoque: number;
  quantity: number;

}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.getInitialCart());
  
  
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor() { }

  
  private getInitialCart(): CartItem[] {
    try {
      const localData = localStorage.getItem('zeosCart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Falha ao carregar o carrinho do localStorage:", error);
      return [];
    }
  }

 
  private updateCart(items: CartItem[]) {
    localStorage.setItem('zeosCart', JSON.stringify(items));
    this.cartItemsSubject.next(items); 
  }

 
  public addToCart(product: any, quantity: number) {
    const currentItems = this.cartItemsSubject.value; 
    const itemExists = currentItems.find(item => item.id === product.id);

    let newItems: CartItem[];

    if (itemExists) {
    
      newItems = currentItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
   
      newItems = [...currentItems, { ...product, quantity }];
    }
    this.updateCart(newItems);
  }

  
  public decrementItem(productId: string) {
    let currentItems = this.cartItemsSubject.value;
    const item = currentItems.find(item => item.id === productId);

    if (item && item.quantity === 1) {
     
      currentItems = currentItems.filter(item => item.id !== productId);
    } else if (item) {
     
      currentItems = currentItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
    this.updateCart(currentItems);
  }


  public removeFromCart(productId: string) {
    const currentItems = this.cartItemsSubject.value;
    const newItems = currentItems.filter(item => item.id !== productId);
    this.updateCart(newItems);
  }

 
  public clearCart() {
    this.updateCart([]);
  }


  public getSubtotal(): number {
    const currentItems = this.cartItemsSubject.value;
    return currentItems.reduce((total, item) => {
      
      const price = parseFloat(item.price.replace(',', '.'));
      return total + (price * item.quantity);
    }, 0);
  }
}