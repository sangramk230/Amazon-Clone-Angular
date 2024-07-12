import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Router } from '@angular/router';
import { Categories } from '../categories';

@Component({
  selector: 'app-categorywise',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorywise.component.html',
  styleUrls: ['./categorywise.component.css']
})
export class CategorywiseComponent implements OnInit {
  category: string = '';
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.category = ProductService.category;
    this.viewProductsByCategory();
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

  viewProductsByCategory() {
    this.productService.viewProductsByCategory(this.category).subscribe(
      (products: Product[]) => {
        this.products = products;
        for(let pr of products){
          pr.image = 'data:image/jpeg;base64,' + pr.image;
        }
        products = [];
      },
      error => {
        console.error('Error fetching products by category: ', error);
      }
    );
  }
}
