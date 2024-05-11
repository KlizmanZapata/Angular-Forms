import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Category } from './../models/category.model';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCategories(){
    return this.http.get<Category[]>(`${environment.url_api}/categories`);
  }

  getCategory(id: string){
    return this.http.get<Category>(`${environment.url_api}/categories/${id}`);
  }

  createCategory(data: Partial<Category>){
    return this.http.post<Category>(`${environment.url_api}/categories`, data);
  }

  updateCategory(id: string, data: Partial<Category>){
    return this.http.put<Category>(`${environment.url_api}/categories/${id}`, data);
  }

  deleteCategory(id: string){
    return this.http.delete<Category>(`${environment.url_api}/categories/${id}`);
  }

  checkAvailability(name: Category['name']) {
    return this.getAllCategories().pipe(
      map((categories) => {
        const isAvailable = !categories.some((category) => category.name === name);
        return isAvailable;
      })
    );
  }
}
