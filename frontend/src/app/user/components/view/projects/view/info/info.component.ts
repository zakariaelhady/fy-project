import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/user/entity/project';
import { ProjectService } from 'src/app/user/service/project.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoProjectComponent implements OnInit{
  constructor(private readonly projectService:ProjectService,
    private readonly route: ActivatedRoute
  ){
    this.route.parent!.parent!.parent!.params.subscribe((params)=>{
      this.userId=params['userId'];
    })
  }
  project: Project={};
  userId: string='';

  ngOnInit(): void {
    this.route.parent!.params.subscribe((param)=>{
      this.getProjectById(param['projectId']);
    });
  }
  getProjectById(projectId: string){
    return this.projectService.getProjectById(projectId).subscribe((project)=>{
      this.project=project
      this.updateProjectForm.patchValue(project);
    });
  }
    update= false;
    updateProjectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('',[Validators.required]),
    })

    changeUpdateState(){
      this.update= !this.update;
    }
    updateProject(){
      return this.projectService.update(this.project).subscribe(()=>{
        this.changeUpdateState();
      });
    }
    onSubmit(){
      Object.assign(this.project,this.updateProjectForm.value)
      this.updateProject();
    }
}