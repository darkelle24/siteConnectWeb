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
    { name: 'lol', strenght: 13 },
    { name: 'lol', strenght: 12 },
    { name: 'lol', strenght: 10 },
    { name: 'lol', strenght: 15 },
    { name: 'lol', strenght: 10 },
    { name: 'lol', strenght: 10 },
    { name: 'lol', strenght: 10 },
    { name: 'lol', strenght: 10 },
    { name: 'lol', strenght: 10 },
  ]

  constructor(private http: HttpClient) {
    this.getWifi()
  }

  getWifi() {
    //this.isLoading = true
    this.wifi = undefined
    this.http.get(environment.url + '/wifis').subscribe({
      next: (value: any) => {
        console.log(value);
        this.wifiList = Object.keys(value).map((oneValue) => {
          return {name: oneValue, strenght: value[oneValue]}
        })
        this.wifiList.sort(function(a, b) {
          return b.strenght - a.strenght;
        })
        console.log(this.wifi)
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      },
    })
  }

  tryToConnect() {
    this.isTryToConnect = true;
    this.http.post(environment.url + '/connect', { ssid: this.wifi[0], password: this.password }).subscribe({
      next: (value: any) => {
        console.log(value);
        this.http.post(environment.url + '/validate', {}).subscribe({
          next: (value: any) => {
            console.log(value);
            this.isTryToConnect = false;
          },
          error: (err: any) => {
            console.error(err);
            this.isTryToConnect = false;
          }
        })
      },
      error: (err: any) => {
        console.error(err);
        this.isTryToConnect = false;
      },
    })
  }
}
