import { Component, OnInit } from '@angular/core';
import { SignalrService } from "../signalr.service";
import { Message, User } from "../signalr.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Array<User> = new Array<User>();
  selectedUser!: User;
  msg!: string;

  constructor(
    public  signalrService: SignalrService
  ) { }

  ngOnInit(): void {
    this.userOnList();
    this.userOffList();
    this.logOutList();
    this.getOnlineUsersList();
    this.sendMsgList()

    //hubConnection.state is 1 when hub connection is connected
    //  if(this.signalrService.hubConnection.state == 1)
    if(this.signalrService.hubConnection?.state) this.getOnlineUsersInv();
    else {
      this.signalrService.ssSubj.subscribe((obj: any) => {
        if (obj.type == "HubConnStarted"){
          this.getOnlineUsersInv()
        }
      });
    }
  }

  logOut(): void {
    this.signalrService.hubConnection.invoke("logOut", this.signalrService.userData.id)
      .catch(err => console.log(err));
  }
  logOutList(): void {
    this.signalrService.hubConnection.on("logoutResponse", () => {
      localStorage.removeItem("personId");
      location.reload();
      //this.signalrService.hubConnection.stop();
    });
  }
  //void
  userOnList(): void {
    this.signalrService.hubConnection.on("userOn", (newUser: User) => {
      console.log(newUser);
      this.users.push(newUser);
    });
  }
  userOffList(): void {
    this.signalrService.hubConnection.on("userOff", (personId: string) => {
      this.users = this.users.filter(u => u.id != personId);
    });
  }

  //coneccted
  getOnlineUsersInv(): void {
    this.signalrService.hubConnection.invoke("getOnlineUsers")
      .catch(err => console.error(err));
  }

  private getOnlineUsersList(): void {
    this.signalrService.hubConnection.on("getOnlineUsersResponse", (onlineUsers: Array<User>) => {
      this.users = [...onlineUsers];
      console.log(this.users);
    });
  }

  //---msgs
  sendMsgInv(): void {
    if (this.msg?.trim() === "" || this.msg == null) return;

    this.signalrService.hubConnection.invoke("sendMsg", this.selectedUser.connId, this.msg)
      .catch(err => console.error(err));

    if (this.selectedUser.msgs == null) this.selectedUser.msgs = [];
    this.selectedUser.msgs.push(new Message(this.msg, true));
    this.msg = "";
  }

  private sendMsgList(): void {
    this.signalrService.hubConnection.on("sendMsgResponse", (connId: string, msg: string) => {
      let receiver = this.users.find(u => u.connId === connId);
      if (receiver?.msgs == null) receiver!.msgs = [];
      receiver!.msgs.push(new Message(msg, false));
    });
  }
}
