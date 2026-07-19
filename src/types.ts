export interface TravelInfo {
  distance: string;
  bestTime: string;
  idealFor: string;
}

export interface Destination {
  id: string; // "ella", "galle", etc.
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  thumbnail: string;
  highlights: string[];
  travelInfo: TravelInfo;
}

export interface Hotel {
  id: string;
  name: string;
  image: string;
  destinationId: string;
}

export interface Booking {
  id?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  tourDate: string;
  tourType: string; // Solo, Couple, Family
  hotelOption: string;
  specialRequests?: string;
  destinationId: string;
  createdAt?: string;
}
