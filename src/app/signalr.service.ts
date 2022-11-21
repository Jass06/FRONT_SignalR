import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class SignalrService {

  constructor(
    public toastr: ToastrService,
    public router: Router
  ) { }

  hubConnection!: signalR.HubConnection;
  personName!: string;

  startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/toastr', {

        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

      this.hubConnection
        .start()
        .then(() => {
          console.log('Hub connection Started!');
          //this.askServerListener();
          //this.askServer();
        })
        .catch(err => console.log('Error while starting connection: ' + err))
  }
/*
  async askServer(){
    console.log('askServer Started!');

    await this.hubConnection.invoke("askServer", "opps!")
      .then(() => {
        console.log('askServer.then');
      })
      .catch(err => console.log(err));

    console.log("this is the final prompt");
  }

  askServerListener(){
    console.log('askServerListenerStart');

    this.hubConnection.on("askServerResponse", (someText) => {
      console.log('askServer.listener');
      this.toastr.success(someText);
    })
  }
  */
}
