import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectComponent } from './add/add.component';
import { ProjectsComponent } from './list/projects.component';
import { InfoProjectComponent } from './view/info/info.component';
import { ViewProjectComponent } from './view/view.component';

const routes: Routes = [
  {path: '',component: ProjectsComponent},
  {path: 'new',component: AddProjectComponent},
  {path: 'details/:projectId',component: ViewProjectComponent,
    children:[
      {path: 'info',component: InfoProjectComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
