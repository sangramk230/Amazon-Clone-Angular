import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {  ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../product';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products:Product[]=[];
  selectedProduct:Product = new Product(0,0,'','',0,'','',0,'',0,'','','','');

  constructor(private router: Router,private productService: ProductService){
    this.viewProduct();
  }
  loadProduct() {
    this.router.navigateByUrl('/admin/my-product');
  }
  loadProfile(){
    this.router.navigateByUrl('/admin/profile');
  }
  viewProduct(){
    this.productService.viewProduct().subscribe(
      (data:Product[])=>{
        this.products=data;
        for(let product of this.products){
          product.image = 'data:image/png;base64,' + product.image;
        }
      }
    );
  }
  delProduct(productid:number){
    this.productService.delProduct(productid).subscribe(
      (data:Product)=>{
        alert("Product Deleted");
        this.viewProduct();
      }
    );
  }
  loadUpdateProduct(products:Product){
ProductService.product=products;
   console.log(ProductService.product);
    this.router.navigateByUrl('/admin/add-product');
  }

}
