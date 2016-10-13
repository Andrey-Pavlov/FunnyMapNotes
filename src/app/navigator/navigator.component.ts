import { Component } from '@angular/core';
import { Map } from 'leaflet';
import { GeocodingService } from '../shared/services/geocoding.service';
import { MapService } from '../shared/services/map.service';
import { Location } from '../shared/core/location.class';

@Component({
  selector: 'navigator',
  template: require('./navigator.component.html'),
  styles: [
    require('./navigator.component.scss')
  ],
  providers: []
})
export class NavigatorComponent {
  address: string;

  private map: Map;

  constructor(private geocoder: GeocodingService, private mapService: MapService) {
    this.address = '';
  }

  ngOnInit() {
    this.mapService.disableMouseEvent('goto');
    this.mapService.disableMouseEvent('place-input');
    this.map = this.mapService.map;
  }

  goto() {
    if (!this.address) {
      return;
    }

    this.geocoder.geocode(this.address)
      .subscribe((location: Location) => {
        this.map.fitBounds(location.viewBounds, undefined);
        this.address = location.address;
      }, error => console.error(error));
  }
}
