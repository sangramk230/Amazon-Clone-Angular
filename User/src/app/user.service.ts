import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  signup(user:User) {
    return this.http.post<void>("http://localhost:8080/api/signup/user",user);
  }
  userLogin(email: string, password: string){
    return this.http.get<Boolean>(`http://localhost:8080/api/login/user/${email}/${password}`); 
  }

  userProfile(){
    return this.http.get<any>("http://localhost:8080/api/profile");
  }
  userProfileUpdate(user:User){
    return this.http.put<any>("http://localhost:8080/api/profileUpdate",user);
  }
  logout(){
    return this.http.get("http://localhost:8080/api/logout");
  }
}
