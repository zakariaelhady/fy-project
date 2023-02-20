import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserModule } from '../user/user.module';
import { RouterModule } from '@angular/router';
import { LayoutRoutingModule } from './layout-routing.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    UserModule,
    MatIconModule,
    RouterModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
