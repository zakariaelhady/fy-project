import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { Sort,MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/user/entity/project';
import { ProjectService } from 'src/app/user/service/project.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements AfterViewInit{
  constructor(private readonly projectService: ProjectService,
    private readonly route: ActivatedRoute){
    this.searchProjectForm.valueChanges.subscribe((data)=>{
      this.search=data.search;
      this.getProjectsCount();
      this.getProjects();
    })

    this.route.parent!.parent!.params.subscribe((param)=>{
      this.userId=param['userId'];
    });
  }
  projects: Project[]=[];
  userId:string='';
  displayedColumns: string[] = [ 'name', 'description','actions'];
  dataSource = new MatTableDataSource<Project>();
  pageSizeOptions = [5, 10, 25,100];
  itemsPerPage=this.pageSizeOptions[0];
  pageNumber=1;
  length=50;
  @ViewChild(MatSort) sort: MatSort | null=null;

  searchProjectForm = new FormGroup({
    search: new FormControl()
  })
  search='';

  ngAfterViewInit() {
    this.getProjectsCount();
    this.getProjects();
    this.dataSource.sort = this.sort;
  }

  onPaginate(pageEvent: PageEvent) {
    this.itemsPerPage = +pageEvent.pageSize;
    this.pageNumber = +pageEvent.pageIndex + 1;
    this.getProjects();
  }

  sortE={
    sortedBy: "_id",
    sortOrder :"asc"
  }
  customSort(sortEvent: Sort){
    this.sortE.sortedBy=sortEvent.active;
    this.sortE.sortOrder=sortEvent.direction;
    this.getProjects();
  }

  getProjects(){
    this.projectService.getProjects(this.userId,this.itemsPerPage,this.pageNumber,this.sortE,this.search).subscribe((projects) =>{
      this.projects=projects;
      this.dataSource.data=projects;
    })
  }

  getProjectsCount(){
    this.projectService.count(this.userId,this.search).subscribe((total) =>{
      this.length=total;
    })
  }

  deleteProject(projectId: string){
    this.projectService.delete(this.userId,projectId).subscribe((project)=>{
      this.projects = this.projects.filter((project) => {
        return project._id !== projectId;
      });
      this.dataSource.data=this.projects;
    });
  }

}