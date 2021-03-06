import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocsListComponent } from './docs-list/docs-list.component';
import { DocDetailComponent } from './doc-detail/doc-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DocAddComponent } from './doc-add/doc-add.component';
import {
  MatCommonModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatSelectModule,
  MatDatepickerModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { LoginComponent } from './login/login.component';
import { AuthorAddComponent } from './author-add/author-add.component';

@NgModule({
  declarations: [
    AppComponent,
    DocsListComponent,
    DocDetailComponent,
    DocAddComponent,
    LoginComponent,
    AuthorAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    MatDatepickerModule,
    SatDatepickerModule,
    SatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
