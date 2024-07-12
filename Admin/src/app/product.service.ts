import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { Category } from './category';
import { Admin } from './admin';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  static product: Product = new Product(0, 0,'', '', 0, '', '', 0, '',0,'','','','');

  constructor(private http:HttpClient) { }
  addProduct(product:Product):Observable<Product>{
  return this.http.post<Product>("http://localhost:8081/api/admin/addProduct", product);
  }
  viewProduct():Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:8081/api/admin/viewProducts");
  }
  delProduct(productid:number):Observable<Product>{
    return this.http.delete<Product>("http://localhost:8081/api/admin/delProduct/"+productid);
  }
  updateProduct(product:Product):Observable<Product>{
    return this.http.put<Product>("http://localhost:8081/api/admin/updateProduct", product);
  }
  addCategories(cate:Category){
    return this.http.post<Category>("http://localhost:8081/api/admin/addCategory", cate);
  }
  viewCategory(){
    return this.http.get<Category[]>("http://localhost:8081/api/admin/viewCategory");
  }
  delCategory(categoryid:number){
    return this.http.delete<Category>("http://localhost:8081/api/admin/delCategory/"+categoryid);
  }
  approval(){
    return this.http.get<Product[]>("http://localhost:8081/api/admin/approval");
  }
  actionOnApproval(product:Product):Observable<Product>{
    return this.http.put<Product>("http://localhost:8081/api/admin/actionOnApproval", product);
  }
}


