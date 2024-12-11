import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@e-commerce/products';

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
  constructor(private categoriesServices: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesServices.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
