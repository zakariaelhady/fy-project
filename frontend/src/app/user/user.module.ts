import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './service/user.service';
import { ListComponent } from './components/list/list.component';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { UserRoutingModule } from './user-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './components/view/view.component';
import { MatSortModule } from '@angular/material/sort';
import { InfoComponent } from './components/view/info/info.component';
@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    ViewComponent,
    InfoComponent
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
  providers: [UserService],
  exports:[]
})
export class UserModule { }
