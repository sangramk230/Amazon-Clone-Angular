import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ProductService } from './product.service';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  navHide : boolean = true;
  constructor(private router: Router,private adminService:AdminService){
    
  }
  ngOnInit(): void {
    this.checkRoute(this.router.url);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.url);
      }
    });
  }
  checkRoute(url: string) {
    if (url === '/admin/login') {
      this.navHide = false;
    } else {
      this.navHide = true;
    }
  }
  
  loadProduct() {
    this.router.navigateByUrl('/admin/add-product');
  }
  loadProfile(){
    this.router.navigateByUrl('/admin/profile');
  }
  loadHome(){
    this.router.navigateByUrl('/admin/home');
  }
  loadReport(){
    this.router.navigateByUrl('/admin/report');
  }
  loadCategories(){
    this.router.navigateByUrl('/admin/categories');
  }
  loadUser(){
    this.router.navigateByUrl('/admin/all-users');
  }
  loadApproval(){
    this.router.navigateByUrl('/admin/approval');
  }
}
