import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-approval',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadApprovalData();
    
  }

  loadApprovalData() {
    this.productService.approval().subscribe(
      (data: Product[]) => {
        this.products = data;        
      },
      error => {
        console.error('Error loading approval data: ', error);
      }
    );
  }

  actionOnApproval(product: Product) {
    const productCopy = { ...product, image: product.image.replace(/^data:image\/[a-z]+;base64,/, '') };
    this.productService.actionOnApproval(productCopy).subscribe(
      (data) => {
        console.log('Action on approval successful: ', data);
      },
      error => {
        console.error('Error in action on approval: ', error);
      }
    );
  }
}