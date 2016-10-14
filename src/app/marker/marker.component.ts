import { Component } from '@angular/core';
import { MapService } from '../shared/services/map.service';
import { GooglePlacesService } from '../shared/services/google-places.service';
import { LeafletPhotoPlugin } from '../shared/interfaces/leaflet-photos/leaflet-photo-plugin.interface';

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

  constructor(private mapService: MapService, private leafletService: GooglePlacesService) {
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

      let self = this;
      let key = 'AIzaSyAEn0dqjwM9uYtdfpg-fZDB5oX03zwSLR4';
      self.leafletService
        .getPlaceSearch({
          key: key,
          location: {lat: e.latlng.lat, lng: e.latlng.lng},
          radius: 50000
        })
        .subscribe((results: any[]) => {
          for (let i = 0; i < results.length; i++) {

            let result = results[i];

            if (result.photos && result.photos.length) {
              for (let photo of result.photos) {

                if (_.find(self.mapService.photoLayer._photos._layers,
                    {photo: {caption: photo.html_attributions[0]}})) {
                  continue;
                }

                self.mapService.photoLayer
                  .add([<LeafletPhotoPlugin>{
                    lat: result.geometry.location.lat(),
                    lng: result.geometry.location.lng(),
                    url: photo.getUrl({maxHeight: 2000, maxWidth: 2000}),
                    thumbnail: photo.getUrl({maxHeight: 100, maxWidth: 100}),
                    caption: photo.html_attributions[0]
                  }]).addTo(this.mapService.map);
              }
            }
          }
        });
    });

    this.mapService.photoLayer = L.photo.cluster().on('click', function (evt) {
      let photo = evt.layer.photo,
        template = '<div><img src="{url}" width="300" height="300" /></a><p>{caption}</p></div>';

      evt.layer.bindPopup(L.Util.template(template, photo), {
        className: 'leaflet-popup-photo',
        minWidth: 300
      }).openPopup();
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
