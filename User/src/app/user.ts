export class User{
    userid: number;
    name: string;
    email: string;
    phoneno: number;
    gender: string;
    dob: string;
    password: string;
    confirmpassword: string;
    role: string ;
    image: string; 
    constructor(userid: number,name: string,email: string,phoneno: number,gender: string,dob: string,password: string,confirmpassword: string,image: string) {
      this.userid = userid;
      this.name = name;
      this.email = email;
      this.phoneno = phoneno;
      this.gender = gender;
      this.dob = dob;
      this.password = password;
      this.confirmpassword = confirmpassword;
      this.role = 'User';
      this.image = image;
    }
  }
  