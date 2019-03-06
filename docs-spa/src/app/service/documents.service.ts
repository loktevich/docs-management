import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../model/document';

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

  headers(): HttpHeaders {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(sessionStorage.getItem('token')) });
    return headers;
  }

  getPage(pageIndex: number, pageSize: number, direction: string, props: string, filterBy: string): Observable<any> {
    const params = new HttpParams()
      .set('p', pageIndex.toString())
      .set('s', pageSize.toString())
      .set('d', direction)
      .set('pr', props)
      .set('f', filterBy);
    return this.http.get(this.apiUrl, { headers: this.headers(), params: params });
  }

  getDocument(id: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id, { headers: this.headers() });
  }

  addDocument(docFile: File, document: Document): Observable<any> {
    const formData = new FormData();
    formData.append('docFile', docFile);
    const restDocument = this.createRestDoc(document);
    formData.append('document', new Blob([JSON.stringify(restDocument)], { type: 'application/json' }));
    return this.http.post(this.apiUrl + '/add', formData, { headers: this.headers() });
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id, { headers: this.headers() });
  }

  updateDocument(id: number, document: Document, docFile?: File): Observable<any> {
    const formData = new FormData();
    if (docFile) {
      formData.append('docFile', docFile);
    }
    const restDocument = this.createRestDoc(document);
    formData.append('document', new Blob([JSON.stringify(restDocument)], { type: 'application/json' }));
    return this.http.put(this.apiUrl + '/' + id, formData, { headers: this.headers() });
  }

  loadDocument(id: number): void {
    const fileUrl = `${this.apiUrl}/${id}/download`;
    window.open(fileUrl, '_self');
  }

  createRestDoc(document: Document): Object {
    return {
      description: document.description,
      authorId: document.author.authorId,
      readOnly: document.readOnly
    };
  }
}
