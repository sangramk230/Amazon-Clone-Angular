import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  ProductService } from '../product.service';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import { Product } from '../product';
import { Category } from '../category';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  productt:Product = new Product(0,0,'','',0,'','',0,'',0,'','','','');
  category:Category[]=[];
  isUpdateMode: boolean = false;
  isSubmitMode: boolean = false;

constructor(private productService:ProductService,private router:Router){
  this.productt = ProductService.product || this.productt;
  this.set();
  this.loadCategory();
  
}
set(){
  if (this.productt.productid && this.productt.productid !== 0) {
    this.isUpdateMode = true;
    this.isSubmitMode = false;
  } else {
    this.isUpdateMode = false;
    this.isSubmitMode = true;
  }
}
handleFileInput(event: any): void {
  const file: File = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      this.productt.image = base64String;
    };
    reader.readAsDataURL(file); 
  }
}

addProduct(){
  this.productService.addProduct(this.productt).subscribe(
    (response) => {
      this.productt = response;
      alert('Product added successfully');
      window.location.reload();
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
}
updateProduct(data:Product){
  this.productService.updateProduct(data).subscribe(
    (data:Product)=>{
     this.productt= data;
     console.log(this.productt);
      alert("Product Updated");
      this.router.navigateByUrl('/admin/home');
    }
  );
}
loadCategory(){
  this.productService.viewCategory().subscribe(
    (data)=>{
      this.category=data;
    }
  );
}
}
