import {EventEmitter, Injectable} from '@angular/core';

import { HubConnectionBuilder, HubConnection }  from '@microsoft/signalr';
import * as signalR from "@microsoft/signalr";
import {Articulo} from "./articulo.model";

@Injectable({
  providedIn: 'root'
})
export class SignalrSendService {

  public hubConnection!: HubConnection;
  emNotifica: EventEmitter<Articulo> = new EventEmitter<Articulo>();

  constructor() {
    console.log("Inicializando siganlr Articulo")
    let builder = new HubConnectionBuilder();
    this.hubConnection = builder.withUrl("https://localhost:5001/apiHubUrl",{
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    }
  ).build();

    this.hubConnection.on("enviarTodos", (mensaje) => {
      let art : Articulo = JSON.parse(mensaje);
      this.emNotifica.emit(art);
      console.log(art)
    } )
    this.hubConnection.start()
      .catch(err => console.log('Error while starting connection: ' + err));
  }
//csd
}
