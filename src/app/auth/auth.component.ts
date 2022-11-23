import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalrService } from "../signalr.service";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit , OnDestroy{

  constructor(
      public signalrService: SignalrService,
      public authService: AuthService
  ) { }

  //3
  ngOnInit(): void {
    this.authService.authMeListenerSuccess();
    this.authService.authMeListenerFail();
  }

  ngOnDestroy(): void {
    this.signalrService.hubConnection.off("authMeResponseSuccess");
    this.signalrService.hubConnection.off("authMeResponseFail");
  }

  onSubmit(form: NgForm){
    if (!form.valid){
      return;
    }

    this.authService.authMe(form.value.userName, form.value.password);
    form.reset();
  }

}
