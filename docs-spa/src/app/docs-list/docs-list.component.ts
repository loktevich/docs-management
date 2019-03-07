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
  dateRange = new FormControl('');

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
    this.dateRange.setValue('');
    this.getDocumentsPage(this.pageEvent);
    this.isLoaded = true;
    this.getAuthors();
  }

  getDocumentsPage(event: PageEvent, sort?: Sort): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    let direction;
    let props;
    if (sort) {
      direction = sort.direction;
      props = sort.active;
    } else {
      direction = this.sort.direction.toString();
      props = this.sort.active;
    }
    const filterBy = this.authorControl.value || '';
    const dateRange = this.getDateRangeParameter();
    this.docService.getPage(pageIndex, pageSize, direction, props, filterBy, dateRange).subscribe(
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

  sortPage(sort: Sort): void {
    const pageEvent = this.cretePageEvent();
    this.getDocumentsPage(pageEvent, sort);
    this.paginator.pageIndex = 0;
  }

  filterByAuthor(): void {
    const pageEvent = this.cretePageEvent();
    this.getDocumentsPage(pageEvent);
    this.paginator.pageIndex = 0;
  }

  filterByDate(allData: boolean): void {
    const pageEvent = this.cretePageEvent();
    if (allData) {
      this.dateRange.setValue('');
    }
    this.getDocumentsPage(pageEvent);
    this.paginator.pageIndex = 0;
  }

  cretePageEvent(): PageEvent {
    const pageEvent = new PageEvent();
    const pageIndex = 0;
    const pageSize = this.paginator.pageSize;
    pageEvent.pageIndex = pageIndex;
    pageEvent.pageSize = pageSize;
    return pageEvent;
  }

  showDetails(id: number): void {
    this.router.navigate(['documents', id]);
  }

  emptyStorage(): void {
    this.storageService.emptyStorage();
  }

  getDateRangeParameter(): string {
    if (this.dateRange.value === '') {
      return '';
    } else {
      const startDate: Date = this.dateRange.value.begin;
      const endDate: Date = this.dateRange.value.end;
      const sd = this.localizeAndformatDate(startDate);
      const ed = this.localizeAndformatDate(endDate);
      return `${sd}_${ed}`;
    }
  }

  localizeAndformatDate(date: Date): string {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    const s = date.toLocaleDateString('ru-RU', options);
    const dp = s.split('.');
    return `${dp[2]}-${dp[1]}-${dp[0]}`;
  }
}
