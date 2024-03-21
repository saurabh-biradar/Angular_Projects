import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = environment.apiUrl + "cart/";
  private apiCheckOutUrl = environment.apiUrl + "checkout/";
  constructor(private httpClient: HttpClient) { }

  addToCart(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, product);
  }

  getCartItem(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl);
  }

  clearCart(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.apiUrl + id);
  }

  checkout(products: Product[]): Observable<void> {
    return this.httpClient.post<void>(this.apiCheckOutUrl, products);
  }
}
