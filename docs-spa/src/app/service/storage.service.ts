import { Injectable } from '@angular/core';
import { Document } from '../model/document';

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
    this.docInStorage.description = '';
    this.docInStorage.author = '';
    this.docInStorage.readOnly = false;
  }
}
