import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SignalrService {
  constructor(
    public toastr: ToastrService,
    public router: Router
  ) { }

  hubConnection!: signalR.HubConnection;
  personName!: string;
  //3
  ssSubj = new Subject<any>();
  ssObs(): Observable<any>{
    return this.ssSubj.asObservable();
  }

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
          this.ssSubj.next({ type:"HubConnStarted" });
          // console.log('Hub connection Started!');
          //this.askServerListener();
          //this.askServer();
        })
        .catch(err => console.log('Error while starting connection: ' + err))
  }

  /*
  //1
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
