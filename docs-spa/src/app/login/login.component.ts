import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentsService } from '../service/documents.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private docService: DocumentsService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit() {
    this.docService.setAuthorized(false);
    sessionStorage.removeItem('token');
  }

  login(): void {
    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;
    console.log(username);
    console.log(password);
    sessionStorage.setItem('token', `${username}:${password}`);
    this.router.navigate(['documents']);
  }

}
