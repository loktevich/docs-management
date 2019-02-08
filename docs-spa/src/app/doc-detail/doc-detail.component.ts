import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentsService } from '../service/documents.service';
import { Location } from '@angular/common';
import { Document } from '../model/document';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-doc-detail',
  templateUrl: './doc-detail.component.html',
  styleUrls: ['./doc-detail.component.scss']
})
export class DocDetailComponent implements OnInit {

  document = new Document();

  constructor(
    private docService: DocumentsService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router,
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
      error => {
        console.log(error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  editDocPage(id: number): void {
    this.router.navigateByUrl('documents/edit/' + id);
  }

  saveToStorage(document: Document): void {
    this.storageService.saveToStorage(document);
  }

  deleteDoc(): void {
    const docId = +this.route.snapshot.paramMap.get('id');
    this.docService.deleteDocument(docId).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
    this.router.navigateByUrl('/documents');
  }

}
