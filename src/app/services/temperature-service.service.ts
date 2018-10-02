import { Injectable } from '@angular/core';

import { Http } from "@angular/http";

import { map } from "rxjs/operators";

@Injectable()
export class TemperatureService {

  constructor(public http: Http) { }

  getLastTemperature(){
    return this.http
      .get('https://desolate-spire-88402.herokuapp.com/temperatures/1.json')
      .pipe(map(response => response.json()));
  }
    

}
