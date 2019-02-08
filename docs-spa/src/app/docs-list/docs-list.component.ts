import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentsService } from '../service/documents.service';
import { error } from 'util';
import { Document } from '../model/document';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-docs-list',
  templateUrl: './docs-list.component.html',
  styleUrls: ['./docs-list.component.scss']
})
export class DocsListComponent implements OnInit {

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
    this.emptyStorage();
    this.documents.sort = this.sort;
    this.documents.paginator = this.paginator;
  }

  getDocumentList(): void {
    this.docService.getDocuments().subscribe(
      data => {
        this.documents.data = data;
      },
      // tslint:disable-next-line:no-shadowed-variable
      error => {
        return console.log(error);
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
