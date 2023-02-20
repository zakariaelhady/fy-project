import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn=false;
  username='';
  constructor(private readonly authService: AuthService,private router : Router) {
  }

  ngOnInit(): void {
    const token = this.authService.getToken();
    this._isLoggedIn$.next(!!token);
    this._isLoggedIn$.subscribe((val)=>{
      this.isLoggedIn=val;
    });
    if(!!token){
      this.username=this.getDecodedAccessToken(token).name;
    }
  }

  logout(){
    this.authService.logout().subscribe(()=>{
      this._isLoggedIn$.next(false);
      localStorage.removeItem("keycloak_refresh_token");
      this.router.navigate(['/login']);
    })
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
