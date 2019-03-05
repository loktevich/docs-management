import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DocumentsService } from '../service/documents.service';
import { Document } from '../model/document';
import { MatTableDataSource, MatPaginator, MatSort, PageEvent, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { DocumentAuthor } from '../model/author';
import { AuthorService } from '../service/author.service';

@Component({
  selector: 'app-docs-list',
  templateUrl: './docs-list.component.html',
  styleUrls: ['./docs-list.component.scss']
})
export class DocsListComponent implements OnInit, AfterViewInit {

  isLoaded = false;
  pageEvent: PageEvent;
  displayedColumns: string[] = ['documentId', 'documentName', 'author', 'creationDate', 'readOnly'];
  documents = new MatTableDataSource<Document>();
  authors: DocumentAuthor[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private docService: DocumentsService,
    private authorService: AuthorService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.pageEvent = new PageEvent();
    this.pageEvent.pageSize = 5;
    this.pageEvent.pageIndex = 0;
    this.sort.active = 'documentName';
    this.getPage(this.pageEvent);
    this.isLoaded = true;
  }

  ngAfterViewInit() {
    this.documents.filterPredicate = (data: Document, filter: string) => {
      return data.documentId.toString().indexOf(filter) !== -1
        || data.documentName.toLowerCase().indexOf(filter) !== -1;
    };
    this.documents.sort = this.sort;
    this.documents.sortingDataAccessor = (data: Document, header: string) => {
      switch (header) {
        case 'creationDate': return new Date(data.creationDate);
        case 'documentId': return data[header];
        case 'readOnly': return data[header];
        case 'author': return data.author.fullName.toLowerCase();
        default: return data[header].toLowerCase();
      }
    };
  }

  getPage(event: PageEvent): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const direction = this.sort.direction.toString();
    const props = this.sort.active;
    this.docService.getPage(pageIndex, pageSize, direction, props).subscribe(
      data => {
        this.docService.setAuthorized(true);
        this.paginator.length = data.totalElements;
        this.getAuthors();
        this.documents.data = data.content as Document[];
      },
      error => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
      }
    );
  }

  getAuthors(): void {
    this.authorService.getAuthors().subscribe(
      data => {
        this.authors = data as DocumentAuthor[];
      }
    );
  }

  sortPage(event: Sort): void {
    const pageIndex = 0;
    const pageSize = this.paginator.pageSize;
    const direction = event.direction.toString();
    const props = event.active;
    this.docService.getPage(pageIndex, pageSize, direction, props).subscribe(
      data => {
        this.documents.data = data.content as Document[];
        this.paginator.pageIndex = 0;
      }
    );
  }

  showDetails(id: number): void {
    this.router.navigate(['documents', id]);
  }

  emptyStorage(): void {
    this.storageService.emptyStorage();
  }

}
