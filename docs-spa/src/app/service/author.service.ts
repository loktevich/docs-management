import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentAuthor } from '../model/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiUrl = '/api/authors';

  constructor(private http: HttpClient) { }

  headers(): HttpHeaders {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('token')) });
    return headers;
  }

  getAuthors(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.headers() });
  }

  addAuthor(docAuthor: DocumentAuthor): Observable<any> {
    return this.http.post(this.apiUrl + '/add', docAuthor, { headers: this.headers() });
  }

  deleteAuthor(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id, { headers: this.headers() });
  }

}
