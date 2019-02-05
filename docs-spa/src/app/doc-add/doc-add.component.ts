import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-doc-add',
  templateUrl: './doc-add.component.html',
  styleUrls: ['./doc-add.component.scss']
})
export class DocAddComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  profileForm = this.fb.group({
    description: [''],
    author: [''],
    readonly: false
  });

  ngOnInit() {
    this.profileForm.controls['description'].setValue(
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. ' +
      'Consectetur hic voluptate eos cumque? Deleniti vel est laborum incidunt quos expedita repellat maiores! ' +
      'Illo dolore ut consequatur dolores doloremque eos repudiandae. ' +
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur hic voluptate eos cumque? ' +
      'Deleniti vel est laborum incidunt quos expedita repellat maiores! Illo dolore ut consequatur dolores doloremque eos repudiandae.'
    );
  }

}
