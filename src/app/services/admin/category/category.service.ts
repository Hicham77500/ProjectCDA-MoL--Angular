import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomHttpResponse } from 'src/app/interfaces/custom-http-response';
import { Category } from 'src/app/models/category';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {

  }
  public getCategories() {
    return this.http.get(AppSettings.APP_URL + "/categories");

  }
  public getCategory(id: number) {
    return this.http.get<Category>(AppSettings.APP_URL + "/categories/" + id);
  }
  public addCategory(category: Category) {
    console.log(category)
    return this.http.post<Category | HttpErrorResponse>(AppSettings.APP_URL + '/categories', category)
  }
  public editCategory(id: number, category: Category) {
    console.log(id,category)
    return this.http.put<Category | HttpErrorResponse>(AppSettings.APP_URL + "/categories/" + id, category);
  }
  public deleteCategory(id: number|null) {
    return this.http.delete<CustomHttpResponse>(AppSettings.APP_URL + "/categories/" + id);
  }



  public addCategoriesToLocalCache(categories: Category[]) : void {
    localStorage.setItem('categories', JSON.stringify(categories));
  }
  public getCategoriesFromLocalCache() : Category[] {

    if (localStorage.getItem('categories')) {
      return JSON.parse(localStorage.getItem('categories')!); /* || '{}' */

    }
    else {
      return [];
    }
  }
}
