import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  selectedProduct: Product = new Product(0, 0, '', '', 0, '', '', 1, '', 0, '', '', '', '');
  products: Product[] = [];
  email: string = '';
  address: string = '';
  contact: number = 0;
  first: boolean = false;
  second: boolean = false;

  constructor(private router: Router, private productService: ProductService) {
    this.selectedProduct = ProductService.product;
    this.selectedProduct.price = this.selectedProduct.quantity * this.selectedProduct.price;
    this.products = ProductService.products;
    this.products.forEach(product=>{
      product.price = product.quantity * product.price;
    })
    console.log('sele'+ this.selectedProduct , 'pro'+this.products)
  }

  ngOnInit(): void {
    if (this.selectedProduct.productid > 0) {
      this.first = true;
      this.second = false;
    } else if (this.products.length > 0) {
      this.first = false;
      this.second = true;
    }
  }

  buyProduct(product: Product): void {
    this.productService.buyProduct(product).subscribe(
      () => {
        alert('Product purchased successfully');
        this.router.navigate(['/user/my-order']);
      },
      error => {
        alert('Please try again later.');
        this.router.navigate(['/user/login']);
      }
    );
  }

  buyAllProducts(): void {
    for (let product of this.products) {
      product.email = this.email;
      product.address = this.address;
      product.contact = this.contact;
      product.status = 'In Progress';
    }
    this.productService.buyAllProduct(this.products).subscribe(
      () => {

        alert('Products purchased successfully');
        this.router.navigate(['/user/my-order']);
      },
      error => {
        alert('Error purchasing products. Please try again later.');
        this.router.navigate(['/user/login']);
      }
    );
  }
}
