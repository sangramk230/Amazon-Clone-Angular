import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Category } from '../category';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  category:Category = new Category(0,'');
  categorys:Category[]=[];
constructor(private productService:ProductService,private router:Router){
  this.viewCategory();
}

addCategory(cate:Category){
  this.productService.addCategories(cate).subscribe(
    (data)=>{
      window.location.reload();
    }
  );
}
viewCategory(){
  this.productService.viewCategory().subscribe(
    (data)=>{
      this.categorys=data;
    },error =>{
      this.router.navigateByUrl('/admin/login');
    }
  );
}
delCategory(id:number){
  this.productService.delCategory(id).subscribe(
    (data)=>{
      window.location.reload();
    }
  );
}
}
