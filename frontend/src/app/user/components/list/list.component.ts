import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { Sort,MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { User } from '../../entity/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit{
  constructor(private readonly userService: UserService){
    this.searchUserForm.valueChanges.subscribe((data)=>{
      this.search=data.search;
      this.getUsersCount();
      this.getUsers();
    })
  }
  users: User[]=[];

  displayedColumns: string[] = [ 'name', 'address', 'phone','actions'];
  dataSource = new MatTableDataSource<User>();
  pageSizeOptions = [5, 10, 25,100];
  itemsPerPage=this.pageSizeOptions[0];
  pageNumber=1;
  length=50;
  @ViewChild(MatSort) sort: MatSort | null=null;

  searchUserForm = new FormGroup({
    search: new FormControl()
  })
  search='';

  ngAfterViewInit() {
    this.getUsersCount();
    this.getUsers();
    this.dataSource.sort = this.sort;
  }

  onPaginate(pageEvent: PageEvent) {
    this.itemsPerPage = +pageEvent.pageSize;
    this.pageNumber = +pageEvent.pageIndex + 1;
    this.getUsers();
  }

  sortE={
    sortedBy: "_id",
    sortOrder :"asc"
  }
  customSort(sortEvent: Sort){
    this.sortE.sortedBy=sortEvent.active;
    this.sortE.sortOrder=sortEvent.direction;
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers(this.itemsPerPage,this.pageNumber,this.sortE,this.search).subscribe((users) =>{
      this.users=users;
      this.dataSource.data=users;
    })
  }

  getUsersCount(){
    this.userService.count(this.search).subscribe((total) =>{
      this.length=total;
    })
  }

  deleteUser(userId: string){
    this.userService.delete(userId).subscribe((user)=>{
      this.users = this.users.filter((user) => {
        return user._id !== userId;
      });
      this.dataSource.data=this.users;
    });
  }

}