import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  signupDiv: boolean = false;
  loginDiv: boolean = true;
  user: User = new User(0,'','',91,'','','','', '');

  constructor(private userService: UserService, private router: Router) {}

  toggleSignup(): void {
    this.signupDiv = true;
    this.loginDiv = false;
  }

  toggleLogin(): void {
    this.signupDiv = false;
    this.loginDiv = true;
  }

  handleFileInput(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        this.user.image = base64String;
      };
      reader.readAsDataURL(file); 
    }
  }
  

  signup(): void {
    if (this.user.password !== this.user.confirmpassword) {
      alert('Passwords do not match.');
      return;
    }

    this.userService.signup(this.user).subscribe(
      () => {
        
        this.loginDiv = true;
        this.signupDiv = false;
      },
      error => {
        console.error('Error signing up:', error);
       
      }
    );
  }

  login(): void {
    this.userService.userLogin(this.user.email, this.user.password).subscribe(
      next => {
        if (next) {
          this.router.navigateByUrl('/user/home');
        } else {
          alert('Wrong Details. Please try again.');
        }
      },
      error => {
        alert('Login failed. Please try again.');
      }
    );
  }
}