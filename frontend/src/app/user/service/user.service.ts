import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl : string ="http://localhost:3000/users";

  constructor(private http : HttpClient) { }

  getUserById(id: string){
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getUsers(limit: number,page: number,sort: {sortedBy: string,sortOrder :string},search: string){
    return this.http.get<User[]>(this.apiUrl,{
      params: {
        limit: limit,
        page: page,
        sortedBy: sort.sortedBy,
        sortOrder: sort.sortOrder,
        search:search
      }
    });
  }

  count(search: string){
    return this.http.get<number>(`${this.apiUrl}/items/count`,{
      params: {
        search:search
      }
    });
  }

  create(user: User){
    return this.http.post(this.apiUrl,user);
  }

  update(user:User){
    return this.http.patch(`${this.apiUrl}/${user._id}`,user);
  }

  delete(id: string){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
