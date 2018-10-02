import { Component, OnInit, TemplateRef } from '@angular/core';
import { TemperatureService } from '../services/temperature-service.service';
 
@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {

  public temperature: number = 0;
  public isStart: boolean = false;
  public hourTemperature: string = null;
  public dateTemperature: string = null;

  constructor(private _TemperatureService: TemperatureService) { }

  ngOnInit() {
  }

  startGetTemperature(){
    this.isStart = true;  
    this.getLastTemperature();
  }

  getLastTemperature(){
    let response =  this._TemperatureService.getLastTemperature();

    response.subscribe(
      result => {
        if(result[0].value != undefined){
          this.temperature = result[0].value
          let date:Date = new Date(result[0].created_at);

          this.hourTemperature = date.getHours() + ":" + date.getMinutes()
          this.dateTemperature = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();


          if(this.isStart){
            setTimeout(() => { this.getLastTemperature(); }, 300);  
          }
          
        }
        
      },
      err =>{}
    )

  }

  stopGetTemperature(){
    this.isStart = false;
  }

}