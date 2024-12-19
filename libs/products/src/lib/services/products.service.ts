import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../../../../../apps/admin/src/environments/environment.development';
import { environment } from '@env/environment';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}products/get-all-products`);
  }
  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(
      `${this.apiUrl}products/get-product-by-id/${productId}`
    );
  }
  createProduct(product: FormData): Observable<Product> {
    return this.http.post<Product>(
      `${this.apiUrl}products/add-product`,
      product
    );
  }

  deleteProduct(proudctID: string): Observable<Product> {
    return this.http.delete<Product>(
      `${this.apiUrl}products/delete-product/${proudctID}`
    );
  }

  editProduct(proudctId: string, proudct: FormData): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiUrl}products/update-proudct/${proudctId}`,
      proudct
    );
  }
}
