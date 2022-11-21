import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "./auth.service";

export class User {
  public id!: string;
  public name!: string;
  public connId!: string; //signalr
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService) {
  }

  canActivate(): boolean{
    if(!this.authService.isAuthenticated){
      this.authService.router.navigateByUrl("auth");
      return false;
    }
    return true;
  }

}
