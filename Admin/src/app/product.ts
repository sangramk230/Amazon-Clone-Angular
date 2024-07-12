export class Product {
  productid: number;
  userid: number;
  name: string;
  brand: string;
  price: number;
  description:string;
  category: string;
  quantity: number;
  email: string;
  contact: number;
  address: string;
  image: string; 
  status: string ; 
  buyorcart: string;

  constructor(
    productid: number,
    userid: number,
    name: string,
    brand: string,
    price: number,
    description:string,
    category: string,
    quantity: number,
    email: string,
    contact: number,
    address: string,
    image: string,
    status: string ,
    buyorcart: string
  ) {
    this.productid = productid;
    this.userid = userid;
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.description = description;
    this.category = category;
    this.quantity = quantity;
    this.email = email;
    this.contact = contact;
    this.address = address;
    this.image = image;
    this.status = status;
    this.buyorcart = buyorcart;
  }
}

