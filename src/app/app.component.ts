import {Component, OnDestroy, OnInit} from '@angular/core';
import {SignalrService} from "./signalr.service";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit, OnDestroy{
  title = 'FRONT_SignalR';

  constructor(
    public signalrService: SignalrService,
    public authService: AuthService
  ) {
  }
  ngOnInit(): void {
    this.signalrService.startConnection();
/*
    setTimeout(() => {
      this.signalrService.askServerListener();
      this.signalrService.askServer();
    }, 2000)
  */
  }

  ngOnDestroy(): void {
    this.signalrService.hubConnection.off("askServerResponse")
  }
}
