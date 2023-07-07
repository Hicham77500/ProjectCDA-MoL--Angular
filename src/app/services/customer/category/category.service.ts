import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private http:HttpClient) { }
  
  getAllCategories() {
     return this.http.get(AppSettings.APP_URL + '/categories');
  }
  getCategory(id:number) {
    return this.http.get(AppSettings.APP_URL + '/categories/' + id);
 }
}
