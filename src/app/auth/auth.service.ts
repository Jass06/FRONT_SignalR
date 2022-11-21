import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignalrService } from  'src/app/signalr.service';

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
      if (this.signalrService.hubConnection?.state ) {
        this.reauthMeListener();
        this.reauthMe(tempPersonId);
      } else {
        this.signalrService.ssObs().subscribe((obj: any) => {
          if (obj.type == "HubConnStarted"){
            this.reauthMeListener();
            this.reauthMe(tempPersonId);
          }
        });
      }
    }
  }

  public isAuthenticated: boolean = false;

  //----------- 2
  async authMe(person: string, pass: string) {
    let personInfo = {userName: person, password: pass};

    await this.signalrService.hubConnection.invoke("authMe", personInfo)
      .then(() => this.signalrService.toastr.info("Loging in attempt..."))
      .catch(err => console.error(err));
  }
  //----------- 3
  async reauthMe(personId: string | null) {
    await this.signalrService.hubConnection.invoke("reauthMe", personId)
      .then(() => this.signalrService.toastr.info("Loging in attempt..."))
      .catch(err => console.error(err));
  }

  //----------- 3
  authMeListenerSuccess() {
    this.signalrService.hubConnection.on("authMeResponseSuccess", (personId: string, personName: string) => {
      console.log(personId);
      console.log(personName);

      localStorage.setItem("personId", personId);
      this.signalrService.personName = personName;
      this.isAuthenticated = true;
      this.signalrService.toastr.success("Login successful!");
      this.signalrService.router.navigateByUrl("/home");
    });
  }

  // ----------- 2
  authMeListenerFail() {
    this.signalrService.hubConnection.on("authMeResponseFail", () => {
      this.signalrService.toastr.error("Wrong credentials!");
    });
  }


  //----------- 3
  reauthMeListener() {
    this.signalrService.hubConnection.on("reauthMeResponse", (personId: string, personName: string) => {
      console.log(personId);
      console.log(personName);

      this.signalrService.personName = personName;
      this.isAuthenticated = true;
      this.signalrService.toastr.success("Re-authenticated!");
      if (this.signalrService.router.url == "/auth") this.signalrService.router.navigateByUrl("/home");
    });
  }
}
