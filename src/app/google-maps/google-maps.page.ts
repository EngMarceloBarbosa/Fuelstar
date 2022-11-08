import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { TasksService } from '../shared/services/tasks.service';
import { environment } from 'src/environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.page.html',
  styleUrls: ['./google-maps.page.scss'],
})
export class GoogleMapsPage implements OnInit {




  @ViewChild('map') mapRef: ElementRef;
  //  apiKey: any = 'AIzaSyDgo_7FWwNkotPbqjOr2mxn106mLc7eTnc';
  newMap: GoogleMap;
  teste = false;

  latitude: any;
  longitude: any;
  constructor(public router: Router, public tasksService: TasksService) { }


  ngOnInit() {
    console.log('Entrou')

  }

  ngAfterViewInit(){

    this.createMap();
  }

  async ngOnDestroy() {
    console.log('saiu');
    await this.newMap.destroy().then(res => this.teste = true);
  }



  async createMap() {
    let coordinates = await Geolocation.getCurrentPosition();
    this.tasksService.latitude = coordinates.coords.latitude
    this.tasksService.longitude = coordinates.coords.longitude
    console.log(this.tasksService.latitude)
    console.log(this.tasksService.longitude)
    this.newMap = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: this.mapRef.nativeElement, // reference to the capacitor-google-map element
      apiKey: environment.apiKey, // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: this.tasksService.latitude,
          lng: this.tasksService.longitude,
        },
        zoom: 3, // The initial zoom level to be rendered by the map
      },
    });
    this.addMarkers();
    console.log(this.newMap);


    // setTimeout(async () => {
    //   console.log('asdasdasd');
    //   await this.newMap.destroy().then(res => this.teste = true)
    // }, 4000);
  }


  async addMarkers() {
    const markers: Marker[] = [
      {

        coordinate: {
          lat: this.tasksService.latitude,
          lng: this.tasksService.longitude,
        },
        title: 'localização atual',
        snippet: 'melhor local'
      }
    ];
    await this.newMap.addMarkers(markers);

    this.newMap.setOnMarkerClickListener(async (marker) => {
      console.log(marker)
    })
  }



  exit() {
    this.newMap = null;
    console.log("passou aqui ")
    this.router.navigate(['/tabs/tab1'])
  }


  // async ionViewDidLeave() {


  //   await this.newMap.destroy();
  // }

}

