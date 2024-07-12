import { Component } from '@angular/core';
import {  UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';

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
  users: User[] = [];
  uu: User = new User(0,'','',0,'','','','', '');


  constructor(private userService:UserService,private router:Router) {
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
    this.userService.userProfile().subscribe(
      (data)=>{
      this.users = data;
      for(let user of this.users){
        user.image = 'data:image/png;base64,' + user.image;
      }
      console.log(data);
    },error =>{
      this.router.navigateByUrl('/user/login');
    }
  );
  }
  loadProfileUpdate(data:User){
    this.uu = data;
    this.first=false;
    this.second=true;
  }
  updateProfile(user:User) {
  this.userService.userProfileUpdate(user).subscribe(
  (data)=>{
    this.uu = data;   
    window.location.reload();
  }
);  
  }
}
