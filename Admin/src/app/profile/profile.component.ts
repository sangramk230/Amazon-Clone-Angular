import { Component } from '@angular/core';
import {  AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Admin } from '../admin';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  first:boolean=true;
  second:boolean=false;
    admin: Admin[] = [];
    uu: Admin = new Admin(0,'','',0,'','','','', '');
  
  
    constructor(private adminService:AdminService,private router:Router) {
      this.profile();
    }
  
    handleFileInput(event: any): void {
      const file: File = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = (reader.result as string).split(',')[1];
          this.uu.image = base64String;
        };
        reader.readAsDataURL(file); 
      }
    }
    profile(){
      this.adminService.adminProfile().subscribe(
        (data)=>{
        this.admin = data;
        for(let user of this.admin){
          user.image = 'data:image/png;base64,' + user.image;
        }
        console.log(data);
      },error =>{
        this.router.navigateByUrl('/admin/login');
      }
    );
    }
    loadProfileUpdate(data:Admin){
      this.uu = data;
      this.first=false;
      this.second=true;
    }
    updateProfile(admin:Admin) {
    this.adminService.adminProfileUpdate(admin).subscribe(
    (data)=>{
      this.uu = data;   
      window.location.reload();
    }
  );  
    }
  }