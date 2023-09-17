import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { WeatherData } from 'src/app/models/interfaces/Weather';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: []
})
export class WeatherHomeComponent implements OnInit, OnDestroy{
  readonly destroy$: Subject<void> = new Subject(); 
  initialCityName = 'Lavras'
  weatherData!: WeatherData;
  searchIcon = faMagnifyingGlass;

  constructor(private weatherService: WeatherService){}
  
  ngOnInit(): void {
    this.getWeatherData(this.initialCityName)
      
  }

  getWeatherData(cityName: string):void {
    this.weatherService.getWeatherData(cityName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response)=>{
          if(response){
            this.weatherData = response
          } 
        },
        error: (error) => console.log(error)
      })
  }

  onSubmit():void{
    this.getWeatherData(this.initialCityName);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
