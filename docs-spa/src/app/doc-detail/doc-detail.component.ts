import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentsService } from '../service/documents.service';
import { Location } from '@angular/common';
import { Document } from '../model/document';

@Component({
  selector: 'app-doc-detail',
  templateUrl: './doc-detail.component.html',
  styleUrls: ['./doc-detail.component.scss']
})
export class DocDetailComponent implements OnInit {

  document: Document;

  constructor(
    private route: ActivatedRoute,
    private docService: DocumentsService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getDocument();
  }

  getDocument(): void {
    const docId = +this.route.snapshot.paramMap.get('id');
    this.docService.getDocument(docId).subscribe(
      data => {
        this.document = data;
      },
      // tslint:disable-next-line:no-shadowed-variable
      error => {
        return console.log(error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

}
