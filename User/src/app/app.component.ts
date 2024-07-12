import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProductService } from './product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from './product';
import { Categories } from './categories';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  categories: Categories[] = [];
  products: Product[] = [];
  second: boolean = false;

  constructor(private router: Router, private productService: ProductService) {}
  ngOnInit() {
    this.viewCategory();
  }

  loadProfile() {
    this.router.navigateByUrl('/user/profile').then(()=>{
      window.location.replace('/user/profile');})
  }

  loadCart() {
    this.router.navigateByUrl('/user/cart').then(()=>{
      window.location.replace('/user/cart');})
  }

  loadOrder() {
    this.router.navigateByUrl('/user/my-order').then(()=>{
      window.location.replace('/user/my-order');})
  }

  loadHome() {
    this.second = false;
    this.router.navigateByUrl('/user/home').then(()=>{
      window.location.replace('/user/home');})
  }

  logout() {
    this.router.navigateByUrl('/user/login').then(()=>{
      window.location.replace('/user/login');})
  }

  viewCategory() {
    this.productService.viewCategory().subscribe(
      (data) => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories: ', error);
      }
    );
  }

  viewProductsByCategory(cate: string) {
    this.second = true;
    this.productService.viewProductsByCategory(cate).subscribe(
      (products: Product[]) => {
        this.products = products.map(pr => ({
          ...pr,
          image: 'data:image/jpeg;base64,' + pr.image
        }));
      },
      error => {
        console.error('Error fetching products by category: ', error);
      }
    );
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
}
