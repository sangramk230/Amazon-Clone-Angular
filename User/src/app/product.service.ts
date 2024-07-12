import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
import { Categories } from './categories';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http:HttpClient) { }
static product : Product = new Product(0,0,'','',0,'','',0,'',0,'','','','');
static products :Product[]=[];
static category:string;
  buyProduct (product:Product):Observable<Product>{
    return this.http.post<Product>(`http://localhost:8080/api/user/buyProduct `,product);
  }
  buyAllProduct (product:Product[]):Observable<Product[]>{
    return this.http.post<Product[]>(`http://localhost:8080/api/user/buyProducts`,product);
  }
  addProductToCart(product:Product):Observable<Product>{
    return this.http.post<Product>(`http://localhost:8080/api/user/addToCart`,product); 
  }
  viewProductsByCategory(category:string):Observable<Product[]>{
    return this.http.get<Product[]>(`http://localhost:8080/api/user/viewProductsByCategory/${category}`); 
  }
  viewCategory():Observable<Categories[]>{
    return this.http.get<Categories[]>(`http://localhost:8080/api/user/viewCategory`); 
  }
  viewOrders():Observable<Product[]>{
    return this.http.get<Product[]>(`http://localhost:8080/api/user/viewOrder`); 
  }
  viewProductCart():Observable<Product[]>{
    return this.http.get<Product[]>(`http://localhost:8080/api/user/viewCart`); 
  }
  viewProductCartById(id:number):Observable<Product[]>{
    return this.http.get<Product[]>(`http://localhost:8080/api/user/viewProductCartById/${id}`);
  } 
  allProduct():Observable<Product[]>{
    return this.http.get<Product[]>(`http://localhost:8080/api/user/allProduct`);
  }  
  delBuyProductById(id:number):Observable<Product>{
    return this.http.delete<Product>(`http://localhost:8080/api/user/delBuyProductsById/${id}`);
  } 
  delCartProductById(id:number):Observable<Product>{
    return this.http.delete<Product>(`http://localhost:8080/api/user/delCartProductsById/${id}`);
  } 
  search(name:string):Observable<Product[]>{
    return this.http.get<Product[]>(`http://localhost:8080/api/user/search/${name}`);
  }
  updateCart(product:Product):Observable<Product>{
    return this.http.put<Product>(`http://localhost:8080/api/user/updateCart`,product);
  }
  updateQuantity(id: number, quantity: number):Observable<Product>{
    return this.http.put<Product>(`http://localhost:8080/api/user/updateQuantity`,{productid:id,quantity});
  }
}
