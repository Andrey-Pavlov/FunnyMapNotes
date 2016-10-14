export enum RankBy {
  prominence,
  distance
}

export interface PlaceNearbySearch {
  key: string;
  location: string;
  radius: number;

  keyword?: string;
  language?: string;
  minprice?: number;
  maxprice?: number;
  name?: string;
  opennow?: boolean;
  rankby?: RankBy;
  type?: string;
  pagetoken?: string;
}
