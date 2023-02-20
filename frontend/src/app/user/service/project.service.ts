import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../entity/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiUrl : string ="http://localhost:3000"
  constructor(private http : HttpClient) { }

  getProjectById(projectId:string){
    return this.http.get<Project>(`${this.apiUrl}/projects/${projectId}`);
  }

  getProjects(userId:string,limit: number,page: number,sort: {sortedBy: string,sortOrder :string},search: string){
    return this.http.get<Project[]>(`${this.apiUrl}/users/${userId}/projects`,{
      params: {
        limit: limit,
        page: page,
        sortedBy: sort.sortedBy,
        sortOrder: sort.sortOrder,
        search:search
      }
    });
  }

  count(userId: string,search: string){
    return this.http.get<number>(`${this.apiUrl}/users/${userId}/projects/count`,{
      params: {
        search:search
      }
    });
  }

  create(userId:string , project: Project){
    return this.http.post(`${this.apiUrl}/users/${userId}/projects`,project);
  }

  update(project:Project){
    return this.http.patch(`${this.apiUrl}/projects/${project._id}`,project);
  }

  delete(userId: string,projectId:string){
    return this.http.delete(`${this.apiUrl}/users/${userId}/projects/${projectId}`);
  }
}
