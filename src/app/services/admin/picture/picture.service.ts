import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Picture } from 'src/app/models/picture';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  


  constructor(private http: HttpClient) {

  }
  public getPictures() {
    return this.http.get(AppSettings.APP_URL + "/admin/pictures");

  }
  public getPicture(id: number) {
    return this.http.get<Picture>(AppSettings.APP_URL + "/admin/getPicture/" + id);
  }
  public addPicture(formData: FormData) { 
    return this.http.post<Picture | HttpErrorResponse>(AppSettings.APP_URL + '/admin/pictures', formData)
  }
  public editPicture(id: number, picture: Picture) {
    return this.http.put<Picture | HttpErrorResponse>(AppSettings.APP_URL + "/admin/update/" + id, picture);
  }
  public deletePicture(id: number|null) {
    
    return this.http.delete<any | HttpErrorResponse>(AppSettings.APP_URL + "/admin/delete/" + id);
  }
  
}
