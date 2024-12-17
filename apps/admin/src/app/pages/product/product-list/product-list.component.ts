import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@e-commerce/products';
import { Product } from 'libs/products/src/lib/model/product';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-list',
  standalone: false,

  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  // constructor() {}
  constructor(
    private productServices: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }
  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Product?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productServices.deleteProduct(productId).subscribe({
          next: () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product has been deleted',
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product could not be deleted',
            });
          },
        });
      },
      reject: () => {},
    });
  }
  editProduct(productId: string) {
    this.router.navigateByUrl(`categories/form/${productId}`);
  }

  private _getProducts() {
    this.productServices.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
