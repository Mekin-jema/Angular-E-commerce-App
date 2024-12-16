import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  // getCategories(): Observable<Category[]> {
  //   return this.http.get<Category[]>(
  //     'http://localhost:3000/api/v1/categories/get-all-categories'
  //   );
  // }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `http://localhost:3000/api/v1/categories/get-all-categories`
    );
  }
  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(
      `http://localhost:3000/api/v1/categories/get-single-category/${categoryId}`
    );
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      'http://localhost:3000/api/v1/categories/add-category',
      category
    );
  }

  deleteCategory(categoryId: string): Observable<Category> {
    return this.http.delete<Category>(
      `http://localhost:3000/api/v1/categories/delete-category/${categoryId}`
    );
  }

  editCategory(categoryId: string, category: Category): Observable<Category> {
    return this.http.put<Category>(
      `http://localhost:3000/api/v1/categories/update-category/${categoryId}`,
      category
    );
  }
}
