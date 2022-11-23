import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignalrService } from  'src/app/signalr.service';
import { User } from "../signalr.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public signalrService: SignalrService,
    public router: Router
  )  {
    let tempPersonId = localStorage.getItem("personId");
    if (tempPersonId){
      //Si esta conectado
      //if (this.signalrService.hubConnection?.state == 1)
      // if(menuOpen == false){}  es igual a if(!menuOpen){}
      // if(menuOpen == true){}   es igual a if(menuOpen){}
      // @ts-ignore
      if (this.signalrService.hubConnection?.state == 1) {
        this.reauthMeListener();
        this.reauthMe(tempPersonId);
      } else {
        this.signalrService.ssObs().subscribe((obj: any) => {
          if (obj.type == "HubConnStarted"){
            this.reauthMeListener();
            // @ts-ignore
           // this.reauthMe(tempPersonId).then(r => console.log(r));
            this.reauthMe(tempPersonId);
          }
        });
      }
    }
  }

  public isAuthenticated: boolean = false;

  async authMe(person: string, pass: string) {
    let personInfo = {userName: person, password: pass};

    await this.signalrService.hubConnection.invoke("authMe", personInfo)
    //  .then(() => this.signalrService.toastr.info("intento de inicio de sesión.."))
      .catch(err => console.error(err));
  }

  authMeListenerSuccess() {
    this.signalrService.hubConnection.on("authMeResponseSuccess", (user: User) => {
      console.log(user);
      this.signalrService.userData = {...user};
      localStorage.setItem("personId", user.id);
      this.isAuthenticated = true;
      this.signalrService.toastr.success("Login successful!");
      this.signalrService.router.navigateByUrl("/home");
    });
  }

  authMeListenerFail() {
    this.signalrService.hubConnection.on("authMeResponseFail", () => {
      this.signalrService.toastr.error("Wrong credentials!");
    });
  }

  async reauthMe(personId: string) {
    await this.signalrService.hubConnection.invoke("reauthMe", personId)
     // .then(() => this.signalrService.toastr.info("Loging in attempt..."))
      .catch(err => console.error(err));
  }

  reauthMeListener() {
    this.signalrService.hubConnection.on("reauthMeResponse", (user: User) => {
      console.log(user);
      this.signalrService.userData = {...user}
      this.isAuthenticated = true;
     // this.signalrService.toastr.success("Re-authenticated!");
      if (this.signalrService.router.url == "/auth") this.signalrService.router.navigateByUrl("/home");
    });
  }
}
