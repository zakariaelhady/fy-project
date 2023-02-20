import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(private readonly authService: AuthService,private router: Router){
  }
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required]),
  })

  ngOnInit(){
    if(!!this.authService.isLoggedIn()){
      this.router.navigate(['users/list']);
    }
  }
  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe((res: any)=>{
      this.authService.setSession(res)
      this.router.navigate(['users/list']);
    })
  }
}
