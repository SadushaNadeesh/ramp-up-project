import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';

import {FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './detail/view-data/detail.component';
import { ExportDataComponent } from './export-data/export-data.component';
import { AddDataComponent } from './detail/add-data/add-data.component';
import { EditDataComponent } from './detail/edit-data/edit-data.component';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadComponent,
    DetailComponent,
    ExportDataComponent,
    AddDataComponent,
    EditDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GraphQLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
