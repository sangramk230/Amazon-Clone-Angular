import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  AdminService } from '../admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Admin } from '../admin';
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, AppComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  admin: Admin = new Admin(0,'','',0,'','','','', '');
  constructor(private adminService:AdminService , private router: Router) {
    
  }


  login(): void {
    this.adminService.adminLogin(this.admin.email, this.admin.password).subscribe(
      next => {
        if (next) {
          AdminService.admin = this.admin;
          this.router.navigateByUrl('/admin/home');
        } else {
          alert('Wrong Details. Please try again.');
        }
      },
      error => {
        console.error('Error logging in:', error);
        alert('Login failed. Please try again.');
      }
    );
  }
}
