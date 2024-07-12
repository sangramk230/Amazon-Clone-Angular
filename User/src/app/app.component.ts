import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ProductService } from './product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from './product';
import { Categories } from './categories';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  categories: Categories[] = [];
  products: Product[] = [];

  constructor(private router: Router, private productService: ProductService) {
    this.loadHome();
    this.viewCategory();
  }

  loadProfile() {
    this.router.navigateByUrl('/user/profile');
  }

  loadCart() {
    this.router.navigateByUrl('/user/cart');
  }

  loadOrder() {
    this.router.navigateByUrl('/user/my-order');
  }

  loadHome() {
    this.router.navigateByUrl('/user/home');
  }
  logout(){
    this.router.navigateByUrl('/user/login');
  }
  viewCategory() {
    this.productService.viewCategory().subscribe(
      (data) => {
        this.categories = data;
      }
    );
  }
  loadCategory(category:string){
    ProductService.category = category;
     this.router.navigateByUrl('/user/category');
  }
}
