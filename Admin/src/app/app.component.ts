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
export class AppComponent{
  showNavbar: boolean = false;
  constructor(private router: Router,private adminService:AdminService){
  
  }
    loadProduct() {
    this.router.navigateByUrl('/admin/add-product').then(()=>{
      window.location.replace('/admin/add-product');})
  }
  loadProfile(){
    this.router.navigateByUrl('/admin/profile').then(()=>{
      window.location.replace('/admin/profile');})
  }
  loadHome(){
    this.router.navigateByUrl('/admin/home').then(()=>{
      window.location.replace('/admin/home');})
  }
  loadReport(){
    this.router.navigateByUrl('/admin/report').then(()=>{
      window.location.replace('/admin/report');})
  }
  loadCategories(){
    this.router.navigateByUrl('/admin/categories').then(()=>{
      window.location.replace('/admin/categories');})
  }
  loadUser(){
    this.router.navigateByUrl('/admin/all-users').then(()=>{
      window.location.replace('/admin/all-users');})
  }
  loadApproval(){
    this.router.navigateByUrl('/admin/approval').then(()=>{
      window.location.replace('/admin/approval');})
  }
}
