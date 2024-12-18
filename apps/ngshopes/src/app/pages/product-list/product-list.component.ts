import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@e-commerce/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-list',
  standalone: false,

  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.sass',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  // constructor() {}
  constructor(
    private productsServices: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }
  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this category?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsServices.deleteProduct(categoryId).subscribe({
          next: () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category has been deleted',
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category could not be deleted',
            });
          },
        });
      },
      reject: () => {},
    });
  }
  editCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  private _getProducts() {
    this.productsServices.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
