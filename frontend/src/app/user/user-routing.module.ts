import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { InfoComponent } from './components/view/info/info.component';
import { ViewComponent } from './components/view/view.component';

const routes: Routes = [
  {path: 'list',component: ListComponent},
  {path: 'new',component: AddComponent},
  {path: 'details/:userId',component: ViewComponent,
    children:[
      {path: 'info',component: InfoComponent},
      {path: 'projects', loadChildren: ()=>import('../user/components/view/projects/project.module')
            .then(m=>m.ProjectModule)}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
