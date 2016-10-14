import { PlaceNearbySearch } from '../place-nearby-search.interface';
import { PlaceDetailsSearch } from '../place-details-search.interface';
import { PlacePhotosRequest } from '../place-photos-request.interface';
import { Observable } from 'rxjs';

export interface LeafletPhotoService {
  getPlaceSearch(params: any): Observable<any>;
  getPlaceDetails(params: PlaceDetailsSearch): Observable<any>;
  getPhotosById(id: PlacePhotosRequest): Observable<any>;
}

