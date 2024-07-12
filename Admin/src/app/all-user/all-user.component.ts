import { Component } from '@angular/core';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-user',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './all-user.component.html',
  styleUrl: './all-user.component.css'
})
export class AllUserComponent {
userAll :Admin[]=[];
constructor(private adminService:AdminService){
  this.allUsers();
}
allUsers(){
  this.adminService.userAllAccount().subscribe(
    (data:Admin[])=>
      this.userAll=data
  );
}
}
