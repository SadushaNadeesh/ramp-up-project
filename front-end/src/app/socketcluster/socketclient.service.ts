import { Injectable, OnInit } from '@angular/core';
import * as socketCluster from 'socketcluster-client';
import { of, Subject } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
(window as any).global = window;


@Injectable({
  providedIn: 'root'
})
export class SocketclientService implements OnInit {

  socket = socketCluster.create({
    hostname: "localhost",
    port: 8000,
  });

  ngOnInit(): void {}

  subject_test = new Subject();

  /////////////////////////////////
  constructor() {

    //subscribe to the server channel and listen for messages(notifications)
    (async () => {
      let channel = this.socket.subscribe("channelName");
      //send data to the  server
      this.socket.transmit("channelName", "Hi Im a new client ");

      for await (let data of channel) {
        // ... Handle channel data.
        console.log(data);
        alert(data + " data received from server");
      }
    })();
  }
  ////////////////////////////////////////////////

  showSuccess(msg: any) {
    console.log(msg);
    alert("New Notification recived !" + msg);
    // this.toastr.info('New Notification recived !', '' + msg, {
    //   "positionClass": "toast-top-full-width",
    // });
  }
}
