import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentsService } from '../service/documents.service';
import { Document } from '../model/document';
import { MatTableDataSource, MatPaginator, MatSort, PageEvent, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { DocumentAuthor } from '../model/author';
import { AuthorService } from '../service/author.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-docs-list',
  templateUrl: './docs-list.component.html',
  styleUrls: ['./docs-list.component.scss']
})
export class DocsListComponent implements OnInit {

  isLoaded = false;
  pageEvent: PageEvent;
  displayedColumns: string[] = ['documentId', 'documentName', 'author', 'creationDate', 'readOnly'];
  documents = new MatTableDataSource<Document>();
  authors: DocumentAuthor[] = [];
  authorControl = new FormControl('');
  maxDate = new Date();
  dateRange = new FormControl();

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
    this.getAuthors();
    const previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 2);
    this.dateRange.setValue({begin: previousDay, end: this.maxDate});
  }

  getPage(event: PageEvent): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const direction = this.sort.direction.toString();
    const props = this.sort.active;
    const filterBy = this.authorControl.value || '';
    this.docService.getPage(pageIndex, pageSize, direction, props, filterBy).subscribe(
      data => {
        this.docService.setAuthorized(true);
        this.documents.data = data.content as Document[];
        this.paginator.length = data.totalElements;
        this.documents.sort = this.sort;
        this.documents.sortingDataAccessor = (_data: Document, header: string) => {
          switch (header) {
            case 'creationDate': return new Date(_data.creationDate);
            case 'documentId': return _data[header];
            case 'readOnly': return _data[header];
            case 'author': return _data.author.fullName.toLowerCase();
            default: return _data[header].toLowerCase();
          }
        };
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
    const filterBy = this.authorControl.value || '';
    this.docService.getPage(pageIndex, pageSize, direction, props, filterBy).subscribe(
      data => {
        this.documents.data = data.content as Document[];
        this.paginator.pageIndex = 0;
      }
    );
  }

  filterByAuthor(): void {
    const pageEvent = new PageEvent();
    const pageIndex = 0;
    const pageSize = this.paginator.pageSize;
    pageEvent.pageIndex = pageIndex;
    pageEvent.pageSize = pageSize;
    this.getPage(pageEvent);
    this.paginator.pageIndex = 0;
  }

  filterByDate(): void {
    // TODO: filtering
  }

  showDetails(id: number): void {
    this.router.navigate(['documents', id]);
  }

  emptyStorage(): void {
    this.storageService.emptyStorage();
  }

}
