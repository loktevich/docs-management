import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DocumentsService } from '../service/documents.service';
import { Document } from '../model/document';
import { MatTableDataSource, MatPaginator, MatSort, MatSortable } from '@angular/material';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-docs-list',
  templateUrl: './docs-list.component.html',
  styleUrls: ['./docs-list.component.scss']
})
export class DocsListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['documentId', 'documentName', 'author', 'creationDate', 'readOnly'];
  documents = new MatTableDataSource<Document>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private docService: DocumentsService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getDocumentList();
  }

  ngAfterViewInit() {
    this.documents.filterPredicate = (data: Document, filter: string) => {
      return data.documentId.toString().indexOf(filter) !== -1
        || data.documentName.toLowerCase().indexOf(filter) !== -1
        || data.author.toLowerCase().indexOf(filter) !== -1;
    };
    this.documents.sort = this.sort;
    this.documents.sortingDataAccessor = (data: Document, header: string) => {
      switch (header) {
        case 'creationDate': return new Date(data.creationDate);
        case 'documentId': return data[header];
        case 'readOnly': return data[header];
        default: return data[header].toLowerCase();
      }
    };
    this.documents.paginator = this.paginator;
  }

  getDocumentList(): void {
    this.docService.getDocuments().subscribe(
      data => {
        this.docService.setAuthorized(true);
        this.documents.data = data as Document[];
      },
      error => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
      }
    );
  }

  applyFilter(filterValue: string): void {
    this.documents.filter = filterValue.trim().toLowerCase();
  }

  showDetails(id: number): void {
    this.router.navigate(['documents', id]);
  }

  emptyStorage(): void {
    this.storageService.emptyStorage();
  }

}
