import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../entity/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent{
  constructor(
    private readonly route: ActivatedRoute
  ){
    this.route.params.subscribe((param)=>{
      this.userId=param['userId'];
    })
  }
  userId: string='';
  // constructor(private readonly userService:UserService,
  //   private readonly route: ActivatedRoute
  // ){}
  // user: User={};

  // ngOnInit(): void {
  //   this.route.params.subscribe((param)=>{
  //     this.getUserById(param['userId']);
  //   });
  // }
  // getUserById(userId: string){
  //   return this.userService.getUserById(userId).subscribe((user)=>{
  //     this.user=user
  //     this.updateUserForm.patchValue(user);
  //   });
  // }
  //   update= false;
  //   updateUserForm = new FormGroup({
  //     name: new FormControl('', [Validators.required,Validators.minLength(4)]),
  //     email: new FormControl('',[Validators.required,Validators.email]),
  //     phone: new FormControl('',[Validators.pattern('[- +()0-9]+')]),
  //     address: new FormControl()
  //   })

  //   changeUpdateState(){
  //     this.update= !this.update;
  //   }
  //   updateUser(){
  //     return this.userService.update(this.user).subscribe(()=>{
  //       this.changeUpdateState();
  //     });
  //   }
  //   onSubmit(){
  //     Object.assign(this.user,this.updateUserForm.value)
  //     this.updateUser();
  //   }
}
