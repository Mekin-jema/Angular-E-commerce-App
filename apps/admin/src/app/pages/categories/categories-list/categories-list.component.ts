import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@e-commerce/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-categories-list',
  standalone: false,

  templateUrl: './categories-list.component.html',
  styles: ``,
})
export class CategoriesListComponent implements OnInit {
  // categories = [
  //   {
  //     id: 1,
  //     name: 'Category 1',
  //     icon: 'fa fa-home',
  //   },
  //   {
  //     id: 2,
  //     name: 'Category 2',
  //     icon: 'fa fa-home',
  //   },
  //   {
  //     id: 3,
  //     name: 'Category 3',
  //     icon: 'fa fa-home',
  //   },
  // ];
  categories: Category[] = [];
  // constructor() {}
  constructor(
    private categoriesServices: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }
  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this category?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesServices.deleteCategory(categoryId).subscribe({
          next: () => {
            this._getCategories();
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

  private _getCategories() {
    this.categoriesServices.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
