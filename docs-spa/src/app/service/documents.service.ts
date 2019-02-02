import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private apiUrl = '/api/';

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<any> {
    return this.http.get(this.apiUrl + 'documents');
  }

  getDocument(id: number): Observable<any> {
    return this.http.get(this.apiUrl + 'documents/' + id);
  }

  addDocument(): void {}

  deleteDocument(): void {}

  updateDocument(): void {}

}
