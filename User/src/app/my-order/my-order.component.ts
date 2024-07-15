import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {  ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-my-order',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css'
})
export class MyOrderComponent {
  products:Product[]=[];
  first:boolean=false;
  second:boolean=false;
  updatedProduct:Product = new Product(0,0,'','',0,'','',0,'',0,'','','','');

  constructor(private router: Router, private productService: ProductService) {
    this.viewBuyOrder();
  }

  viewBuyOrder() {
    this.productService.viewOrders().subscribe(
      (data) => {
        this.first = true;
        this.second = false;
        this.products = data;
      },error => {
        this.router.navigateByUrl('/user/login');
      }
      
    );
  }

  delProductBuy(id: number) {
    this.productService.delBuyProductById(id).subscribe(
      (data) => {
        if (data) {
          this.products = this.products.filter(product => product.productid !== id);
        }
      }
    );
  }

  loadUpdate(up: Product) {
    this.updatedProduct = up;
    this.second = true;
    this.first = false;
  }

  updateProductBuy(product: Product) {
    this.productService.updateCart(product).subscribe(
      (data) => {
        const index = this.products.findIndex(p => p.productid === data.productid);
        if (index !== -1) {
          this.products[index] = data;
        }
        this.second = false;
        this.first = true;
      }
    );
  }



}