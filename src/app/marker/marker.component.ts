import { Component } from '@angular/core';
import { MapService } from '../shared/services/map.service';

@Component({
  selector: 'marker',
  template: require('./marker.component.html'),
  styles: [
    require('./marker.component.scss')
  ],
  providers: []
})
export class MarkerComponent {
  editing: boolean;
  removing: boolean;
  markerCount: number;

  constructor(private mapService: MapService) {
    this.editing = false;
    this.removing = false;
    this.markerCount = 0;
  }

  ngOnInit() {
    this.mapService.disableMouseEvent('add-marker');
    this.mapService.disableMouseEvent('remove-marker');
  }

  Initialize() {
    this.mapService.map.on('click', (e: any) => {
      if (this.editing) {
        let marker = L.marker(e.latlng, {
          icon: L.icon({
            iconUrl: require('../../../node_modules/leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('../../../node_modules/leaflet/dist/images/marker-shadow.png')
          }),
          draggable: true
        })
          .bindPopup('Marker #' + (this.markerCount + 1).toString(), {
            offset: L.point(12, 6)
          })
          .addTo(this.mapService.map)
          .openPopup();

        this.markerCount += 1;

        marker.on('click', (event: MouseEvent) => {
          if (this.removing) {
            this.mapService.map.removeLayer(marker);
            this.markerCount -= 1;
          }
        });
      }
    });
  }

  toggleEditing() {
    this.editing = !this.editing;

    if (this.editing === true && this.removing === true) {
      this.removing = false;
    }
  }

  toggleRemoving() {
    this.removing = !this.removing;

    if (this.editing === true && this.removing === true) {
      this.editing = false;
    }
  }
}
