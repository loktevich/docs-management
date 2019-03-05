import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocsListComponent } from './docs-list/docs-list.component';
import { DocDetailComponent } from './doc-detail/doc-detail.component';
import { DocAddComponent } from './doc-add/doc-add.component';
import { LoginComponent } from './login/login.component';
import { AuthorAddComponent } from './author-add/author-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'documents', component: DocsListComponent },
  { path: 'documents/:id', component: DocDetailComponent },
  { path: 'add', component: DocAddComponent },
  { path: 'documents/edit/:id', component: DocAddComponent },
  { path: 'authors', component: AuthorAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
