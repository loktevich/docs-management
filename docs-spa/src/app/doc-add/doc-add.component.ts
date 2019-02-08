import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DocumentsService } from '../service/documents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from '../model/document';
import { StorageService } from '../service/storage.service';
import { FileValidator } from 'ngx-material-file-input';

// spring.servlet.multipart.max-file-size set to 20MB .In bytes
const MAX_FILE_SIZE = 20971520;

@Component({
  selector: 'app-doc-add',
  templateUrl: './doc-add.component.html',
  styleUrls: ['./doc-add.component.scss']
})
export class DocAddComponent implements OnInit {

  pageTitle = 'Add new document';
  fileTitle = 'File';
  fileName = '';
  isEditing = false;
  editValidationError = false;

  constructor(
    private docService: DocumentsService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  documentForm = this.fb.group({
    newFile: [null, [Validators.required, FileValidator.maxContentSize(MAX_FILE_SIZE)]],
    editFile: [null],
    description: ['', Validators.required],
    author: ['', Validators.required],
    readonly: false
  });

  ngOnInit() {
    this.loadDocument();
  }

  loadDocument(): void {
    const document: Document = this.storageService.loadFromStorage();
    if (document.documentId) {
      this.fileName = document.documentName;
      this.pageTitle = 'Edit document #' + document.documentId;
      this.fileTitle = 'Attached File';
      this.isEditing = true;
    }
    this.documentForm.controls['description'].setValue(document.description);
    this.documentForm.controls['author'].setValue(document.author);
    this.documentForm.controls['readonly'].setValue(document.readOnly);
  }

  saveDoc(description: string, author: string, readonly: boolean): void {
    const document = new Document();
    document.description = description;
    document.author = author;
    document.readOnly = readonly;
    if (this.isEditing) {
      const docId = +this.route.snapshot.paramMap.get('id');
      const fileForm = this.documentForm.controls['editFile'];
      this.editValidationError = this.documentForm.controls['description'].invalid || this.documentForm.controls['author'].invalid;
      if (fileForm && fileForm.value) {
        this.docService.updateDocument(docId, document, fileForm.value.files[0]).subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log(error);
          }
        );
      } else {
        this.docService.updateDocument(docId, document).subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log(error);
          }
        );
      }
    } else {
      const fileForm = this.documentForm.controls['newFile'];
      this.docService.addDocument(fileForm.value.files[0], document).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    }
    this.router.navigateByUrl('/documents');
  }

  cancel(): void {
    if (this.isEditing) {
      const docId = +this.route.snapshot.paramMap.get('id');
      this.router.navigateByUrl('/documents/' + docId);
    } else {
      this.router.navigateByUrl('/documents');
    }
  }

}
