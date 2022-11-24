import { Component, OnInit } from '@angular/core';
import {SignalrSendService} from "./signalr-send.service";
import {Articulo} from "./articulo.model";

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  articulos!: Articulo[];
  constructor(
    private serviceArticulo: SignalrSendService
  ) { }

  ngOnInit(): void {
    this.serviceArticulo.emNotifica.subscribe((valor) => {
      this.articulos.push(valor);
    })
    this.cargaInicial()
  }

  cargaInicial() {
    this.articulos= [
      {IdArticulo:1, ArticuloName: "AHRE"}
    ]
  }
}
