import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomHttpResponse } from 'src/app/interfaces/custom-http-response';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  


  constructor(private http: HttpClient) {

  }
  public getPosts() {
    return this.http.get(AppSettings.APP_URL + "/posts");

  }
  public getPost(id: number) {
    return this.http.get<Post>(AppSettings.APP_URL + "/getPost/" + id);
  }
  public addPost(post: Post) { 
    
    return this.http.post<Post | HttpErrorResponse>(AppSettings.APP_URL + '/posts', post)
  }
  public editPost(id: number, post: Post) {
    return this.http.put<Post | HttpErrorResponse>(AppSettings.APP_URL + "/posts/" + id, post);
  }
  public deletePost(id: number|null) {
    console.log(id);
    return this.http.delete<CustomHttpResponse>(AppSettings.APP_URL + "/posts/" + id);
  }
  public addPostsToLocalCache(posts: Post[]) : void {
    localStorage.setItem('posts', JSON.stringify(posts));
  }
  public getPostsFromLocalCache() : Post[] {

    if (localStorage.getItem('posts')) {
      return JSON.parse(localStorage.getItem('posts')!); /* || '{}' */

    }
    else {
      return [];
    }
  }
}
