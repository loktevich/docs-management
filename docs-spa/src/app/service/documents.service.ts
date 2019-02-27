import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../model/document';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private apiUrl = '/api/documents';
  private authorized = false;

  constructor(private http: HttpClient) { }

  setAuthorized(auth: boolean): void {
    this.authorized = auth;
  }

  isAuthorized(): boolean {
    return this.authorized;
  }

  getDocuments(): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('token')) });
    return this.http.get(this.apiUrl, { headers });
  }

  getDocument(id: number): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('token')) });
    return this.http.get(this.apiUrl + '/' + id, { headers });
  }

  addDocument(docFile: File, document: Document): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('token')) });
    const formData = new FormData();
    formData.append('docFile', docFile);
    formData.append('document', new Blob([JSON.stringify(document)], { type: 'application/json' }));
    return this.http.post(this.apiUrl + '/add', formData, { headers });
  }

  deleteDocument(id: number): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('token')) });
    return this.http.delete(this.apiUrl + '/' + id, { headers });
  }

  updateDocument(id: number, document: Document, docFile?: File): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('token')) });
    const formData = new FormData();
    if (docFile) {
      formData.append('docFile', docFile);
    }
    formData.append('document', new Blob([JSON.stringify(document)], { type: 'application/json' }));
    return this.http.put(this.apiUrl + '/' + id, formData, { headers });
  }

  loadDocument(id: number): void {
    const fileUrl = `${this.apiUrl}/${id}/download`;
    window.open(fileUrl, '_self');
  }

}
