import { Route } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { DasboardComponent } from './pages/dasboard/dasboard.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ProductFormComponent } from './pages/product/product-form/product-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        component: DasboardComponent,
      },

      {
        path: 'categories',
        component: CategoriesListComponent,
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent,
      },
      {
        path: 'categories/form/:id',
        component: CategoriesFormComponent,
      },
      { path: 'product', component: ProductListComponent },
      {
        path: 'product/form',
        component: ProductFormComponent,
      },
      {
        path: 'product/form/:id',
        component: ProductFormComponent,
      },
      { path: 'users', component: UsersListComponent },
      {
        path: 'users/form',
        component: UsersFormComponent,
      },
      {
        path: 'users/form/:id',
        component: UsersFormComponent,
      },
    ],
  },
];
