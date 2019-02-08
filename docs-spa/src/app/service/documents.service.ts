import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../model/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private apiUrl = '/api/documents';

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getDocument(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id);
  }

  addDocument(docFile: File, document: Document): Observable<any> {
    const formData = new FormData();
    formData.append('docFile', docFile);
    formData.append('document', new Blob([JSON.stringify(document)], { type: 'application/json' }));
    return this.http.post(this.apiUrl + '/add', formData);
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  updateDocument(id: number, docFile: File, document: Document): Observable<any> {
    const formData = new FormData();
    formData.append('docFile', docFile);
    formData.append('document', new Blob([JSON.stringify(document)], { type: 'application/json' }));
    return this.http.put(this.apiUrl + '/' + id, formData);
  }

}
