import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { TasksService } from '../shared/services/tasks.service';
import { environment } from 'src/environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';


@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.page.html',
  styleUrls: ['./google-maps.page.scss'],
})
export class GoogleMapsPage implements OnInit {


 options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
};



  @ViewChild('map') mapRef: ElementRef;
  //  apiKey: any = 'AIzaSyDgo_7FWwNkotPbqjOr2mxn106mLc7eTnc';
  newMap: GoogleMap;
  teste = false;

  latitude: any;
  longitude: any;
  constructor(public router: Router, public tasksService: TasksService, private nativeGeocoder: NativeGeocoder) { }


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
console.log(this.tasksService.listTasksById?.address.addressLine1)
  await this.nativeGeocoder.forwardGeocode('Travessa Oneca Mendes', this.options)
    .then(async (result: NativeGeocoderResult[]) => { console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude)
    console.log(result[0])
    this.tasksService.latitude = result[0].latitude
    this.tasksService.longitude = result[0].longitude
    console.log(   this.tasksService.latitude,  this.tasksService.longitude , 'coordenadas' )


    console.log(this.tasksService.latitude)
    console.log(  this.tasksService.longitude)

    // let coordinates = await Geolocation.getCurrentPosition();
    // this.tasksService.latitude = coordinates.coords.latitude
    // this.tasksService.longitude = coordinates.coords.longitude
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



  })
    .catch((error: any) => console.log(error));


    // setTimeout(async () => {
    //   console.log('asdasdasd');
    //   await this.newMap.destroy().then(res => this.teste = true)
    // }, 4000);
  }


  async addMarkers() {
    const markers: Marker[] = [
      {

        coordinate: {
          lat: 41.44310359430382,
          lng:-8.294370288568537
        },
        title: 'destino',
        snippet: 'melhor local'
      },
      {

        coordinate: {
          lat: this.tasksService.latitude,
          lng: this.tasksService.longitude,
        },
        title: this.tasksService.listTasksById?.address.addressLine1,
        snippet: this.tasksService.listTasksById?.address.addressLine1
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

