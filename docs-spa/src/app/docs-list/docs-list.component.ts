import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../service/documents.service';
import { error } from 'util';
import { Document } from '../model/document';

@Component({
  selector: 'app-docs-list',
  templateUrl: './docs-list.component.html',
  styleUrls: ['./docs-list.component.scss']
})
export class DocsListComponent implements OnInit {

  documents: Array<Document>;

  constructor(private docService: DocumentsService) { }

  ngOnInit() {
    this.getDocumentList();
  }

  getDocumentList(): void {
    this.docService.getDocuments().subscribe(
      data => {
        this.documents = data;
      },
      // tslint:disable-next-line:no-shadowed-variable
      error => {
        return console.log(error);
      }
    );
  }
}
