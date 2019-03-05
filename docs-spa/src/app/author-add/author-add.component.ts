import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DocumentAuthor } from '../model/author';
import { DocumentsService } from '../service/documents.service';
import { AuthorService } from '../service/author.service';

@Component({
  selector: 'app-author-add',
  templateUrl: './author-add.component.html',
  styleUrls: ['./author-add.component.scss']
})
export class AuthorAddComponent implements OnInit {

  isLoaded = false;
  displayedColumns: string[] = ['authorId', 'fullName', 'delete'];
  authors = new MatTableDataSource<DocumentAuthor>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authorService: AuthorService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  authorForm = this.fb.group({
    fullName: [''],
  });

  ngOnInit() {
    this.getAuthors();
    this.authors.paginator = this.paginator;
    this.authors.sort = this.sort;
    this.authors.sortingDataAccessor = (data: DocumentAuthor, header: string) => {
      switch (header) {
        case 'authorId': return data[header];
        default: return data[header].toLowerCase();
      }
    };
    this.authors.filterPredicate = (data: DocumentAuthor, filter: string) => {
      return data.authorId.toString().indexOf(filter) !== -1
        || data.fullName.toLowerCase().indexOf(filter) !== -1;
    };
  }

  getAuthors(): void {
    this.authorService.getAuthors().subscribe(
      data => {
        this.authors.data = data as DocumentAuthor[];
        this.isLoaded = true;
        this.authors.paginator = this.paginator;
      },
      error => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
      }
    );
  }

  saveAuthor(fullName: string): void {
    const author = new DocumentAuthor();
    author.fullName = fullName;
    this.authorService.addAuthor(author).subscribe(
      response => {
        this.authorForm.controls['fullName'].setValue('');
        this.getAuthors();
      },
      error => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
      }
    );
  }

  deleteAuthor(authorId: number): void {
    const index = this.authors.data.findIndex(a => a.authorId === authorId);
    this.authorService.deleteAuthor(authorId).subscribe(
      data => {
        this.authors.data.splice(index, 1);
        this.authors.paginator = this.paginator;
      },
      error => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
      }
    );
  }

  applyFilter(filterValue: string): void {
    this.authors.filter = filterValue.trim().toLowerCase();
  }

  cancel(): void {
    this.router.navigate(['documents']);
  }

}
