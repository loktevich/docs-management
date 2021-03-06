import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentsService } from '../service/documents.service';
import { Document } from '../model/document';
import { StorageService } from '../service/storage.service';
import { DocumentAuthor } from '../model/author';

@Component({
  selector: 'app-doc-detail',
  templateUrl: './doc-detail.component.html',
  styleUrls: ['./doc-detail.component.scss']
})
export class DocDetailComponent implements OnInit {

  document = new Document();
  author = new DocumentAuthor();

  constructor(
    private docService: DocumentsService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getDocument();
  }

  getDocument(): void {
    const docId = +this.route.snapshot.paramMap.get('id');
    this.docService.getDocument(docId).subscribe(
      data => {
        this.docService.setAuthorized(true);
        this.document = data as Document;
        this.author = this.document.author;
      },
      error => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
      }
    );
  }

  loadDocument(id: number): void {
    this.docService.loadDocument(id);
  }

  cancel(): void {
    this.router.navigateByUrl('/documents');
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
        this.router.navigateByUrl('/documents');
      },
      error => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
      }
    );
  }

}
