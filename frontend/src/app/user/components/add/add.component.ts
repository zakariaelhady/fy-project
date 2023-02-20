import { Component } from '@angular/core';
import { User } from '../../entity/user';
import { UserService } from '../../service/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  constructor(private readonly userService: UserService){}

  alert= {
    key:'',
    text:'',
    show: false
  }
  createUserForm = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(4)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    phone: new FormControl('',[Validators.pattern('[- +()0-9]+')]),
    address: new FormControl()
  })

  onSubmit(){
    this.createUser(this.createUserForm.value);
  }

  createUser(user: User){
    return this.userService.create(user).subscribe(()=>{
      this.createUserForm.patchValue({
        name:'',
        email:'',
        address:'',
        phone:''
      });
      this.alert={
        key:'success',
        text:'User created Successfully',
        show: true
      }
    });
  }

}
