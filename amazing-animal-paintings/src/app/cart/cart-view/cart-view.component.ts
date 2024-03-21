import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})

export class CartViewComponent implements OnInit {
  cartItems: Product[] = [];
  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    this.cartService.getCartItem().subscribe((res) => {
      res.forEach((item) => {
        item.id = Number(item.id);
        item.price = Number(item.price);
        this.cartItems.push(item);
      });
    });
  }

  getTotalPrice(): number {
    let total = 0;
    for (let item of this.cartItems) {
      total += item.price;
    }
    return total;
  }

  clearCart(): void {
    this.cartItems.forEach((item) => {
      this.cartService.clearCart(item.id).subscribe();
    })
    this.cartItems = [];
  }

  checkout(): void {
    this.cartService.checkout(this.cartItems).subscribe();
  }
}
