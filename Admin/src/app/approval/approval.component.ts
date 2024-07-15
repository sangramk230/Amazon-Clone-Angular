import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approval',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './approval.component.html',
  styleUrl: './approval.component.css'
})
export class ApprovalComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadApprovalData();
  }

  loadApprovalData(): void {
    this.productService.approval().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: () => {
        this.router.navigateByUrl('/admin/login');
      }
    });
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file: File | undefined = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        this.products.forEach(product => {
          product.image = base64String;
        });
      };
      reader.readAsDataURL(file);
    }
  }

  actionOnApproval(product: Product): void {
    this.productService.actionOnApproval(product).subscribe({
      next: (data) => {
        console.log('Action on approval successful:', data);
      },
      error: (error) => {
        console.error('Error in action on approval:', error);
      }
    });
  }
}
