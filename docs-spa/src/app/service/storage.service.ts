import { Injectable } from '@angular/core';
import { Document } from '../model/document';
import { DocumentAuthor } from '../model/author';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  docInStorage = new Document();

  constructor() { }

  saveToStorage(document: Document): void {
    this.docInStorage = document;
  }

  loadFromStorage(): Document {
    return this.docInStorage;
  }

  emptyStorage(): void {
    this.docInStorage = new Document();
    const author = new DocumentAuthor();
    author.fullName = '';
    this.docInStorage.description = '';
    this.docInStorage.readOnly = false;
  }
}
