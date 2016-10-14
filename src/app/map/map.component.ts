import { Component, ViewChild } from '@angular/core';
import { NavigatorComponent } from '../navigator/navigator.component';
import { MarkerComponent } from '../marker/marker.component';
import { MapService } from '../shared/services/map.service';
import { GeocodingService } from '../shared/services/geocoding.service';

@Component({
  styles: [
    require('./map.component.scss')
  ],
  template: require('./map.component.html'),
})
export class MapComponent {

  private photoLayer: any;

  @ViewChild(MarkerComponent) markerComponent: MarkerComponent;

  constructor(private mapService: MapService, private geocoder: GeocodingService) {
  }

  ngOnInit() {
    let map = L.map('map', {
      zoomControl: false,
      center: L.latLng(40.731253, -73.996139),
      zoom: 12,
//      minZoom: 4,
      maxZoom: 19,
      layers: [this.mapService.baseMaps.OpenStreetMap]
    });

    L.control.zoom({position: 'topright'}).addTo(map);
    L.control.layers(this.mapService.baseMaps).addTo(map);
    L.control.scale().addTo(map);

    this.mapService.map = map;
    this.geocoder.getCurrentLocation()
      .subscribe(
        location => map.panTo([location.latitude, location.longitude]),
        err => console.error(err)
      );
  }

  ngAfterViewInit() {
    this.markerComponent.Initialize();
  }
}
