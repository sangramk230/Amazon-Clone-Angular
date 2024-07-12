import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from './admin';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  static admin: Admin | null = null;
  constructor(private http: HttpClient) { }

  adminLogin(email: string, password: string){
    return this.http.get<Boolean>(`http://localhost:8081/api/admin/login/admin/${email}/${password}`); 
  }

  adminProfile(){
    return this.http.get<any>("http://localhost:8081/api/admin/profile");
  }
  adminProfileUpdate(admin:Admin){
    return this.http.put<any>("http://localhost:8081/api/admin/profileUpdate",admin);
  }
  userAllAccount(){
    return this.http.get<Admin[]>("http://localhost:8081/api/admin/allUsers");
  }
}

