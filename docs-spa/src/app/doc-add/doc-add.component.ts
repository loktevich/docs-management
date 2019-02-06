import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DocumentsService } from '../service/documents.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Document } from '../model/document';

@Component({
  selector: 'app-doc-add',
  templateUrl: './doc-add.component.html',
  styleUrls: ['./doc-add.component.scss']
})
export class DocAddComponent implements OnInit {

  document: Document;
  isEditing: boolean;

  constructor(
    private fb: FormBuilder,
    private docService: DocumentsService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  documentForm = this.fb.group({
    file: [''],
    description: [''],
    author: [''],
    readonly: false
  });

  ngOnInit() {
    this.documentForm.controls['description'].setValue(
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. ' +
      'Consectetur hic voluptate eos cumque? Deleniti vel est laborum incidunt quos expedita repellat maiores! ' +
      'Illo dolore ut consequatur dolores doloremque eos repudiandae. ' +
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur hic voluptate eos cumque? ' +
      'Deleniti vel est laborum incidunt quos expedita repellat maiores! Illo dolore ut consequatur dolores doloremque eos repudiandae.'
    );
  }

  goBack(): void {
    this.location.back();
  }

}
