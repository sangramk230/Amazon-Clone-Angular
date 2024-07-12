import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { max } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products: Product[] = [];
  total: number = 0;
  subtotal: number = 0;

  constructor(private router: Router, private productService: ProductService) {
    this.viewProductCart();
  }

  viewProductCart(): void {
    this.productService.viewProductCart().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.calculateSubtotal();
      },
      error => {
        alert('Login Please.');
        this.router.navigate(['/user/login']);
      }
    );
  }

  deleteFromCart(productId: number): void {
    this.productService.delCartProductById(productId).subscribe(
      () => {
        alert('Product removed from cart successfully');
        this.viewProductCart();
      },
      error => {
        console.error('Error removing product from cart:', error);
      }
    );
  }

  loadCheckout(product: Product): void {
    ProductService.product = product;
    this.router.navigateByUrl('/user/check').then(() => {
        ProductService.product = new Product(0, 0, '', '', 0, '', '', 0, '', 0, '', '', '', ''); 
    });
}

loadAllProducts(): void {
    ProductService.products = this.products;
    this.router.navigateByUrl('/user/check').then(() => {
        ProductService.products = [];
    });
}

  calculateSubtotal(): void {
    this.subtotal = this.products.reduce((total, product) => total + product.price * product.quantity, 0);
  }
  updateCart(product: Product): void {
    this.productService.updateCart(product).subscribe(
      (data) => {
        this.viewProductCart();
      },
      error => {
        console.error('Error updating product in cart:', error);
      }
    );
  }
}
