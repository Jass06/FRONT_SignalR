import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from "ngx-toastr";
import { FormsModule } from "@angular/forms";

import { AuthComponent } from './auth/auth.component';
import { HomeModule } from './home/home.module';
import { SignalrService } from "./signalr.service";
import {AuthGuard} from "./auth/auth.guard";
import { ArticuloComponent } from './articulo/articulo.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ArticuloComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({
      enableHtml: true,
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
