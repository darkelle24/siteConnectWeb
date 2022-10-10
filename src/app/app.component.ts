import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading: boolean = false;
  isTryToConnect: boolean = false
  wifi: any
  password: any

  wifiList: { name: string, strenght: number }[] = [
    { name: 'lol', strenght: 10 },
    { name: 'lol', strenght: 10 },
    { name: 'lol', strenght: 10 },
    { name: 'lol', strenght: 10 },
    { name: 'lol', strenght: 10 },
    { name: 'lol', strenght: 10 },
    { name: 'lol', strenght: 10 },
    { name: 'lol', strenght: 10 },
    { name: 'lol', strenght: 10 },
    { name: 'lol', strenght: 10 },
    { name: 'lol', strenght: 10 },
    { name: 'lol', strenght: 10 },
    { name: 'lol', strenght: 10 },
  ]

  constructor(private http: HttpClient) {

  }

  getWifi() {
    this.isLoading = true
    this.wifi = undefined
    this.http.get(environment.url + '/LEDOn').subscribe({
      next: (value: any) => {
        console.log(value);
        //this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        //this.isLoading = false;
      },
    })
  }

  tryToConnect() {
    this.isTryToConnect = true;
    this.http.post(environment.url + '/wifi', this.wifi + ':' + this.password).subscribe({
      next: (value: any) => {
        console.log(value);
        //this.isTryToConnect = false;
      },
      error: (err) => {
        console.error(err);
        //this.isTryToConnect = false;
      },
    })
  }
}
