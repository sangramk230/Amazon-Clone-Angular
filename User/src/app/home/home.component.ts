import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Router } from '@angular/router';
import { Categories } from '../categories';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Product[] = [];
  searchResults: Product[] = [];
  productsToDisplay: Product[] = [];
  categories: Categories[] = [];
  searchQuery: string = '';
  static selectedProduct: Product | null = null;
  price: number = 0;

  constructor(private productService: ProductService, private router: Router) {
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.productService.allProduct().subscribe(
      (data: Product[]) => {
      this.products = data.map(product => ({
        ...product,
        image: 'data:image/jpeg;base64,' + product.image
      }));
      this.productsToDisplay = this.products;
    });
  }

  addToCart(product: Product) {
    this.productService.addProductToCart(product).subscribe(
      () => {
        alert('Product added to cart');
        this.router.navigateByUrl('/user/cart');
      },
      error => {
        console.error('Error adding product to cart: ', error);
        alert('Please login');
        this.router.navigate(['/login']);
      }
    );
  }

  proceedToBuy(product: Product) {
    product.quantity = 1;
    ProductService.product = product;
    this.router.navigateByUrl('/user/check');
  }

  search() {
    if (this.searchQuery.trim()) {
      this.productService.search(this.searchQuery).subscribe(
        (data: Product[]) => {
          this.searchResults = data.filter(product => 
            product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          ).map(product => ({
            ...product,
            image: 'data:image/jpeg;base64,' + product.image
          }));

          this.productsToDisplay = this.searchResults.length > 0 ? this.searchResults : this.products;
        },
        error => {
          console.error('Error searching for products: ', error);
          this.productsToDisplay = this.products;
        }
      );
    } else {
      this.productsToDisplay = this.products;
    }
  }
 
}
