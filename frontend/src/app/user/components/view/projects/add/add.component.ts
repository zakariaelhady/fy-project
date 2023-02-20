import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/user/entity/project';
import { ProjectService } from 'src/app/user/service/project.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddProjectComponent {
  constructor(private readonly projectService: ProjectService,
    private readonly route: ActivatedRoute,
    private readonly router: Router){
    this.route.parent!.parent!.params.subscribe((params)=>{
      this.userId=params['userId'];
    });
  }
  userId: string='';
  createProjectForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('',[Validators.required])
  })

  onSubmit(){
    this.createProject(this.createProjectForm.value);
  }

  createProject(project: Project){
    return this.projectService.create(this.userId,project).subscribe(()=>{
      this.createProjectForm.patchValue({
        name:'',
        description:''
      });
      this.router.navigate(['users/details',this.userId,'projects']);
    });
  }

}

