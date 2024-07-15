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
  productsToDisplay: Product[] = [];
  total: number = 0;
  item:number=0;
  subtotal: number = 0;

  constructor(private router: Router, private productService: ProductService) {
    this.viewProductCart();
    this.viewAllProducts();
  }

  viewAllProducts() {
    this.productService.allProduct().subscribe(
      (data: Product[]) => {
      this.productsToDisplay = data.map(product => ({
        ...product,
        image: 'data:image/jpeg;base64,' + product.image
      }));
      
    }
  );
  }
  viewProductCart(): void {
    this.productService.viewProductCart().subscribe(
      (data: Product[]) => {
        this.products = data;
        for(let pr of this.products){
          this.item +=1;
        }
        this.calculateSubtotal();
      },
      error => {
        this.router.navigate(['/user/login']);
      }
    );
  }

  deleteFromCart(productId: number): void {
    this.productService.delCartProductById(productId).subscribe(
      () => {
         this.item= this.item - 1;
        alert('Product removed from cart successfully');
          window.location.replace('/user/cart'); 
      },
      error => {
        this.router.navigate(['/user/login']);
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
  addToCart(product: Product) {
    product.quantity = 1;
    this.productService.addProductToCart(product).subscribe(
      () => {
       
        this.router.navigateByUrl('/user/cart').then(()=>{
          window.location.replace('/user/cart');})
      },
      error => {
        console.error('Error adding product to cart: ', error);
        this.router.navigate(['/login']);
      }
    );
  }

  proceedToBuy(product: Product) {
    product.quantity = 1;
    ProductService.product = product;
    this.router.navigateByUrl('/user/check');
  }
}
