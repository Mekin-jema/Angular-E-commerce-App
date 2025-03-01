import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category';
import { Observable } from 'rxjs';
// import { environment } from '../../../../../apps/admin/src/environments/environment.development';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // getCategories(): Observable<Category[]> {
  //   return this.http.get<Category[]>(
  //     'http://localhost:3000/api/v1/categories/get-all-categories'
  //   );
  // }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.apiUrl}categories/get-all-categories`
    );
  }
  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(
      `${this.apiUrl}categories/get-single-category/${categoryId}`
    );
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      '${this.apiUrl}categories/add-category',
      category
    );
  }

  deleteCategory(categoryId: string): Observable<Category> {
    return this.http.delete<Category>(
      `${this.apiUrl}categories/delete-category/${categoryId}`
    );
  }

  editCategory(categoryId: string, category: Category): Observable<Category> {
    return this.http.put<Category>(
      `${this.apiUrl}categories/update-category/${categoryId}`,
      category
    );
  }
}
