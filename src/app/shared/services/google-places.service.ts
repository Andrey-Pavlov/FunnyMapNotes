import { Injectable } from '@angular/core';
import { Map } from 'leaflet';
import { Http, Jsonp, Response } from '@angular/http';
import { Observable, Observer } from 'rxjs';
import { PlacePhotosRequest } from '../interfaces/leaflet-photos/place-photos-request.interface';
import { PlaceNearbySearch } from '../interfaces/leaflet-photos/place-nearby-search.interface';
import { LeafletPhotoService } from '../interfaces/leaflet-photos/service/leaflet-photo-service.interface';
import { PlaceDetailsSearch } from '../interfaces/leaflet-photos/place-details-search.interface';
import PlaceSearchRequest = google.maps.places.PlaceSearchRequest;
import PlaceResult = google.maps.places.PlaceResult;
import PlacesServiceStatus = google.maps.places.PlacesServiceStatus;
import PlaceSearchPagination = google.maps.places.PlaceSearchPagination;
import LatLngLiteral = google.maps.LatLngLiteral;
import LatLng = google.maps.LatLng;

@Injectable()
export class GooglePlacesService implements LeafletPhotoService {

  private service: any;
  private savedCoord: LatLng|LatLngLiteral;
  private pagination: PlaceSearchPagination;

  constructor(private jsonp: Jsonp) {
    this.service = new google.maps.places.PlacesService(<HTMLDivElement>$('#test')[0]);
  }

  getPlaceSearch(params: PlaceSearchRequest): Observable<PlaceResult[]> {
    let self = this;
    let obs: Observable<PlaceResult[]>;

    obs = Observable.create((observer: Observer<PlaceResult[]>) => {

//      if (self.savedCoord && self.pagination) {
//        if (params.location.lat === self.savedCoord.lat &&
//          params.location.lng === self.savedCoord.lng) {
//
//          if (self.pagination.hasNextPage) {
//            setTimeout(function () {
//              self.pagination.nextPage();
//
//              observer.complete();
//            }, 2000);
//          } else {
//            observer.complete();
//          }
//
//          return;
//        }
//      }

      self.service.nearbySearch(params, function (results: PlaceResult[],
                                                  status: PlacesServiceStatus,
                                                  pagination: PlaceSearchPagination) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
//          self.savedCoord = params.location;
         self.pagination = pagination;

          observer.next(results);
        }
      });

      setTimeout(function () {
        self.pagination.nextPage();
      }, 2000);

      setTimeout(function () {
        self.pagination.nextPage();
      }, 4000);
    });

    return obs;
  }

  getPlaceDetails(params: PlaceDetailsSearch): Observable<any> {

    let str = this.GetKeyValueStr(params);

    return this.jsonp.get('https://maps.googleapis.com/maps/api/place/details/json?callback=JSONP_CALLBACK&' + str)
      .map(x => x.json());
  }

  getPhotosById(id: PlacePhotosRequest): Observable<any> {

    let str = this.GetKeyValueStr(id);

    return this.jsonp.get('https://maps.googleapis.com/maps/api/place/photo?callback=JSONP_CALLBACK&' + str)
      .map(x => x.json());
  }

  private GetKeyValueStr(params: any): string {
    let keyValues = [];

    Object.keys(params).forEach(function (key) {
      let values = '';
      values += key;
      values += '=';
      values += params[key];

      keyValues.push(values);
    });

    let str = keyValues.join('&');

    return str;
  }
}
