import { Component } from '@angular/core';
import { StorageService } from './service/storage.service';
import { DocumentsService } from './service/documents.service';
import { Router } from '@angular/router';
import { AuthorService } from './service/author.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private docService: DocumentsService,
    private authorService: AuthorService,
    private storageService: StorageService,
    private router: Router
  ) { }

  emptyStorage(): void {
    this.storageService.emptyStorage();
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.docService.setAuthorized(false);
    this.storageService.emptyStorage();
    this.router.navigate(['login']);
  }

}
