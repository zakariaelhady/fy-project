import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './project-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { ProjectService } from 'src/app/user/service/project.service';
import { AddProjectComponent } from './add/add.component';
import { ProjectsComponent } from './list/projects.component';
import { InfoProjectComponent } from './view/info/info.component';
import { ViewProjectComponent } from './view/view.component';
@NgModule({
  declarations: [
    ProjectsComponent,
    AddProjectComponent,
    ViewProjectComponent,
    InfoProjectComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSortModule,
    RouterModule,
    UserRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ProjectService],
  exports:[]
})
export class ProjectModule { }
