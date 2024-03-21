import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from '../product.service';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filterProducts: Product[] = [];
  sortOrder: string = "";
  constructor(private productService: ProductService, private cartService: CartService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      // console.log(res);
      res.forEach((item) => {
        item.id = Number(item.id);
        item.price = Number(item.price);
        this.products.push(item);
        this.filterProducts.push(item);
      });
      // console.log(this.products);
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackBar.open("Product added to cart!", "", { duration: 2000, horizontalPosition: 'right', verticalPosition: 'top' })
      }
    });
  }

  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase().trim();
    this.filterProducts = this.products.filter(
      product => product.name.toLowerCase().includes(searchTerm)
    )
  }


  sortProducts(sortValue: string) {
    this.sortOrder = sortValue;
    if (this.sortOrder == "priceLowHigh") {
      this.filterProducts.sort((a, b) => a.price - b.price);
    }
    else {
      this.filterProducts.sort((a, b) => b.price - a.price);
    }
  }
}
