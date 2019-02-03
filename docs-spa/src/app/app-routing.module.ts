import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocsListComponent } from './docs-list/docs-list.component';
import { DocDetailComponent } from './doc-detail/doc-detail.component';
import { DocAddComponent } from './doc-add/doc-add.component';

const routes: Routes = [
  { path: 'documents', component: DocsListComponent },
  { path: 'documents/:id', component: DocDetailComponent },
  { path: 'add', component: DocAddComponent },
  { path: '',   redirectTo: '/documents', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
