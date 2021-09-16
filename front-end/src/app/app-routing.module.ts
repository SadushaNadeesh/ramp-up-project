import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './detail/add-data/add-data.component';
import { EditDataComponent } from './detail/edit-data/edit-data.component';
import { DetailComponent } from './detail/view-data/detail.component';
import { ExportDataComponent } from './export-data/export-data.component';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'add-data', component: AddDataComponent },
  { path: 'data/:id', component: EditDataComponent },
  { path: 'export', component: ExportDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
